package api.webrtc_server.dto;

import java.util.List;

public class    ServerDTO {
    private long serverId;
    private String serverName;
    private long serverAdminId;
    private String serverThumbnail;
    private List<ChannelDTO> channels;

    // Constructor
    public ServerDTO(long serverId, String serverName, long serverAdminId, String image, List<ChannelDTO> channels) {
        this.serverId = serverId;
        this.serverName = serverName;
        this.serverAdminId = serverAdminId;
        this.serverThumbnail = serverThumbnail;
        this.channels = channels;
    }

    // Getters and Setters
    public long getServerId() {
        return serverId;
    }

    public void setServerId(long serverId) {
        this.serverId = serverId;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public long getServerAdminId() {
        return serverAdminId;
    }

    public void setServerAdminId(long serverAdmin) {
        this.serverAdminId = serverAdminId;
    }

    public String getServerThumbnail() {
        return serverThumbnail;
    }

    public void setServerThumbnail(String image) {
        this.serverThumbnail = serverThumbnail;
    }

    public List<ChannelDTO> getChannels() {
        return channels;
    }

    public void setChannels(List<ChannelDTO> channels) {
        this.channels = channels;
    }
}
