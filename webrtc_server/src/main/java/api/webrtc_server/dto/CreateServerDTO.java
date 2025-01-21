package api.webrtc_server.dto;

public class CreateServerDTO {
    private String serverName;
    private Long serverAdminId;
    private String serverThumbnail;  // image 대신 serverThumbnail 사용

    // 기본 생성자
    public CreateServerDTO() {}

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public Long getServerAdminId() {
        return serverAdminId;
    }

    public void setServerAdminId(Long serverAdminId) {
        this.serverAdminId = serverAdminId;
    }

    public String getServerThumbnail() {
        return serverThumbnail;
    }

    public void setServerThumbnail(String serverThumbnail) {
        this.serverThumbnail = serverThumbnail;
    }
}