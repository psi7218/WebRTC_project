package api.webrtc_server.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "server_entity")
public class ServerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serverId;

    private String serverName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "server_admin_id", nullable = false)
    private UserEntity serverAdmin;


    private String serverThumbnail;

    @OneToMany(mappedBy = "server", cascade = CascadeType.ALL)
    private List<ChannelEntity> channels;

    // Getter and Setter

    public Long getServerId() {
        return serverId;
    }

    public void setServerId(Long serverId) {
        this.serverId = serverId;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public UserEntity getServerAdmin() {
        return serverAdmin;
    }

    public void setServerAdmin(UserEntity serverAdmin) {
        this.serverAdmin = serverAdmin;
    }

    public String getServerThumbnail() {
        return serverThumbnail;
    }

    public void setServerThumbnail(String serverThumbnail) {
        this.serverThumbnail = serverThumbnail;
    }

    public List<ChannelEntity> getChannels() {
        return channels;
    }

    public void setChannels(List<ChannelEntity> channels) {
        this.channels = channels;
    }
}
