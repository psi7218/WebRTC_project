package api.webrtc_server.dto;

public class ChannelDTO {
    private Long channelId; // 엔티티와 맞추기 위해 "channelId"로 변경
    private String channelName; // 필드명 통일
    private String channelType; // 필드명 통일

    // 기본 생성자
    public ChannelDTO() {}

    // 생성자
    public ChannelDTO(Long channelId, String channelName, String channelType) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.channelType = channelType;
    }

    // Getters and Setters
    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }
}
