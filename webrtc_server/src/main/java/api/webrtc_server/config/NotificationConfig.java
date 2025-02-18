package api.webrtc_server.config;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationConfig {
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long TIMEOUT = 60L * 1000 * 60;

    @ResponseBody
    public SseEmitter subscribe(Long userId) {
        System.out.println("Subscribing user: " + userId);
        SseEmitter emitter = new SseEmitter(TIMEOUT);

        emitter.onCompletion(() -> {
            System.out.println("SSE completed for user: " + userId);
            emitters.remove(userId);
        });
        emitter.onTimeout(() -> {
            System.out.println("SSE timeout for user: " + userId);
            try {
                emitter.complete();
            } catch (Exception e) {
                System.out.println("Error during timeout handling: " + e.getMessage());
            }
            emitters.remove(userId);
        });
        emitter.onError(e -> {
            System.out.println("SSE error for user: " + userId + ", error: " + e.getMessage());
            try {
                emitter.complete();
            } catch (Exception ex) {
                System.out.println("Error during error handling: " + ex.getMessage());
            }
            emitters.remove(userId);
        });

        emitters.put(userId, emitter);

        try {
            System.out.println("Attempting to send initial connection event to user: " + userId);
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("Connected successfully")
                    .id(String.valueOf(userId)));
            System.out.println("Successfully sent initial connection event to user: " + userId);
        } catch (IOException e) {
            System.out.println("Failed to send initial event to user: " + userId);
            System.out.println("Error message: " + e.getMessage());
            e.printStackTrace();
            emitters.remove(userId);
            try {
                emitter.complete();
            } catch (Exception ex) {
                System.out.println("Error during cleanup: " + ex.getMessage());
            }
            return new SseEmitter();  // 에러 시 새로운 emitter 반환
        }

        return emitter;
    }

    public void sendNotification(Long userId, Object event) {
        System.out.println("Attempting to send notification to user: " + userId);
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(event)
                        .id(String.valueOf(System.currentTimeMillis())));
                System.out.println("Successfully sent notification to user: " + userId);
            } catch (IOException e) {
                System.out.println("Failed to send notification to user: " + userId);
                System.out.println("Error message: " + e.getMessage());
                e.printStackTrace();
                emitters.remove(userId);
                try {
                    emitter.complete();
                } catch (Exception ex) {
                    System.out.println("Error during cleanup: " + ex.getMessage());
                }
            }
        } else {
            System.out.println("No emitter found for user: " + userId);
        }
    }
}