package api.webrtc_server.dto;

import java.time.LocalDateTime;
public class MessageDTO {
    private Long userId;
    private String content;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
                "userId=" + userId +
                ", content='" + content + '\'' +
                '}';
    }
}
