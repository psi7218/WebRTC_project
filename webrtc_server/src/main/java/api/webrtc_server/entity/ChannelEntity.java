package api.webrtc_server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "channel_entity")
public class ChannelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long channelId;
    private Long userId;

    @ManyToOne(optional = true)
    @JoinColumn(name = "serverId", referencedColumnName = "serverId", nullable = true)
    @JsonIgnore // 순환 참조 방지
    private ServerEntity server;

    private String channelName;

    @Enumerated(EnumType.STRING)
    private ChannelType channelType;

    @ElementCollection
    @CollectionTable(
            name = "channel_participants",
            joinColumns = @JoinColumn(name = "channel_id")
    )
    @Column(name = "participant_id")
    private List<Long> participantIds = new ArrayList<>();

    public enum ChannelType {
        CHATTING,
        VOICE,
        DM
    }

    // Getter and Setter
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

    public ServerEntity getServer() {
        return server;
    }

    public void setServer(ServerEntity server) {
        this.server = server;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public ChannelType getChannelType() {
        return channelType;
    }

    public void setChannelType(ChannelType channelType) {
        this.channelType = channelType;
    }
    public List<Long> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Long> participantIds) {
        this.participantIds = participantIds;
    }

    public void addParticipant(Long participantId) {
        if (this.participantIds == null) {
            this.participantIds = new ArrayList<>();
        }
        if (!this.participantIds.contains(participantId)) {
            this.participantIds.add(participantId);
        }
    }
    public void removeParticipant(Long participantId) {
        if (this.participantIds != null) {
            this.participantIds.remove(participantId);
        }
    }
}
