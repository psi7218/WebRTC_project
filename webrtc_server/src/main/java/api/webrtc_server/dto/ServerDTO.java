package api.webrtc_server.dto;

import java.util.List;

public class ServerDTO {
    private long serverId;
    private String serverName;
    private long serverAdmin;
    private String image;
    private List<ChannelDTO> channels;

    // Constructor
    public ServerDTO(long serverId, String serverName, long serverAdmin, String image, List<ChannelDTO> channels) {
        this.serverId = serverId;
        this.serverName = serverName;
        this.serverAdmin = serverAdmin;
        this.image = image;
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

    public long getServerAdmin() {
        return serverAdmin;
    }

    public void setServerAdmin(long serverAdmin) {
        this.serverAdmin = serverAdmin;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<ChannelDTO> getChannels() {
        return channels;
    }

    public void setChannels(List<ChannelDTO> channels) {
        this.channels = channels;
    }
}
