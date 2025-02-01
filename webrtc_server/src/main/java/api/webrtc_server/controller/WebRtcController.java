package api.webrtc_server.controller;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/webrtc")
public class WebRtcController {

    private final OpenVidu openvidu;

    @Autowired
    public WebRtcController(OpenVidu openvidu) {
        this.openvidu = openvidu;
    }

    // 세션 생성
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return ResponseEntity.ok(session.getSessionId());
    }

    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(
            @PathVariable("sessionId") String sessionId,
            @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // 1) 먼저 getActiveSession으로 세션 조회
        Session session = openvidu.getActiveSession(sessionId);

        // 2) 세션이 없다면, 다시 생성
        if (session == null) {
            // 원하는 세션 속성을 지정해도 되고, 기본값으로 해도 됩니다.
            // 여기서는 customSessionId를 sessionId로 지정
            Map<String, Object> sessionParams = new HashMap<>();
            sessionParams.put("customSessionId", sessionId);

            // SessionProperties 만들기
            SessionProperties sessionProperties =
                    SessionProperties.fromJson(sessionParams).build();

            // 새로운 세션 생성
            session = openvidu.createSession(sessionProperties);
        }

        // 3) Connection(토큰) 생성
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        return ResponseEntity.ok(connection.getToken());
    }
}