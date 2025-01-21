package api.webrtc_server.dto;

import java.util.List;

public class ChannelDTO {
    private Long channelId; // 엔티티와 맞추기 위해 "channelId"로 변경
    private String channelName; // 필드명 통일
    private String channelType; // 필드명 통일
    private Long userId;
//    private Long participantId;  // DM 대화 상대 ID
    private List<Long> participantIds;  // 필요한 경우 전체 참여자 목록

    public ChannelDTO() {
    }

    // DM 채널용 생성자 (5개 인자)
    public ChannelDTO(Long channelId, String channelName, String channelType, Long userId, List<Long> participantIds) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.channelType = channelType;
        this.userId = userId;
        this.participantIds = participantIds;
    }

    // 서버 채널용 생성자 (4개 인자)
    public ChannelDTO(Long channelId, String channelName, String channelType, Long userId) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.channelType = channelType;
        this.userId = userId;
        this.participantIds = null;  // 서버 채널은 참여자 목록 불필요
    }


    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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
//    public Long getParticipantId() {
//        return participantId;
//    }
//
//    public void setParticipantId(Long participantId) {
//        this.participantId = participantId;
//    }

    public List<Long> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Long> participantIds) {
        this.participantIds = participantIds;
    }
}
