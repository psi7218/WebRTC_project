package api.webrtc_server.controller;

import api.webrtc_server.dto.ChannelDTO;
import api.webrtc_server.dto.ServerDTO;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    // 서버와 채널을 저장하는 맵
    private final Map<Long, ServerDTO> servers = new ConcurrentHashMap<>();
    private long nextServerId = 1;
    private long nextChannelId = 1;

    // 1. 서버 생성
    @PostMapping("/create")
    public ServerDTO createServer(@RequestBody Map<String, Object> payload) {
        String serverName = (String) payload.get("serverName");
        long serverAdmin = ((Number) payload.get("serverAdmin")).longValue();
        String image = (String) payload.get("image");

        long serverId = nextServerId++;
        ServerDTO newServer = new ServerDTO(serverId, serverName, serverAdmin, image, new ArrayList<>());
        servers.put(serverId, newServer);

        return newServer;
    }

    // 2. 채널 생성
    @PostMapping("/{serverId}/channels/create")
    public ChannelDTO createChannel(
            @PathVariable long serverId,
            @RequestBody Map<String, Object> payload) {

        String channelName = (String) payload.get("channelName");
        String channelType = (String) payload.get("channelType");

        ServerDTO server = servers.get(serverId);
        if (server == null) {
            throw new IllegalArgumentException("Server not found");
        }

        long channelId = nextChannelId++;
        ChannelDTO newChannel = new ChannelDTO(channelId, channelName, channelType);
        server.getChannels().add(newChannel);

        return newChannel;
    }

    // 3. 특정 서버의 채널 목록 가져오기
    @GetMapping("/{serverId}/channels")
    public List<ChannelDTO> getChannels(@PathVariable long serverId) {
        ServerDTO server = servers.get(serverId);
        if (server == null) {
            throw new IllegalArgumentException("Server not found");
        }
        return server.getChannels();
    }

    // 4. 모든 서버 목록 반환
    @GetMapping
    public List<ServerDTO> getAllServers() {
        return new ArrayList<>(servers.values());
    }
}
