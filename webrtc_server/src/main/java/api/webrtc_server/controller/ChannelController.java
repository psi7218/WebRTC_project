package api.webrtc_server.controller;

import api.webrtc_server.dto.ChannelDTO;
import api.webrtc_server.entity.ChannelEntity;
import api.webrtc_server.entity.ServerEntity;
import api.webrtc_server.repository.ChannelRepository;
import api.webrtc_server.repository.ServerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    private final ChannelRepository channelRepository;
    private final ServerRepository serverRepository;

    public ChannelController(ChannelRepository channelRepository, ServerRepository serverRepository) {
        this.channelRepository = channelRepository;
        this.serverRepository = serverRepository;
    }

    // 1. 채널 생성
    @PostMapping("/{serverId}")
    public ChannelEntity createChannel(
            @PathVariable Long serverId,
            @RequestBody ChannelDTO channelDTO) {

        // 서버 확인
        ServerEntity server = serverRepository.findById(serverId)
                .orElseThrow(() -> new IllegalArgumentException("Server not found with ID: " + serverId));

        // 채널 생성 및 매핑
        ChannelEntity channel = new ChannelEntity();
        channel.setServer(server);
        channel.setChannelName(channelDTO.getChannelName());
        channel.setChannelType(ChannelEntity.ChannelType.valueOf(channelDTO.getChannelType().toUpperCase()));

        return channelRepository.save(channel);
    }

    // 2. 특정 서버의 모든 채널 조회
    @GetMapping("/{serverId}")
    public List<ChannelDTO> getChannelsByServer(@PathVariable Long serverId) {
        // 서버 확인
        ServerEntity server = serverRepository.findById(serverId)
                .orElseThrow(() -> new IllegalArgumentException("Server not found with ID: " + serverId));

        // 채널 목록 조회 및 DTO 변환
        return server.getChannels().stream()
                .map(channel -> new ChannelDTO(
                        channel.getChannelId(),
                        channel.getChannelName(),
                        channel.getChannelType().name()
                )).collect(Collectors.toList());
    }
}
