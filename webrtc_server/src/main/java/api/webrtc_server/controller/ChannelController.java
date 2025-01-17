package api.webrtc_server.controller;

import api.webrtc_server.dto.ChannelDTO;
import api.webrtc_server.entity.ChannelEntity;
import api.webrtc_server.entity.ServerEntity;
import api.webrtc_server.entity.UserEntity;
import api.webrtc_server.repository.ChannelRepository;
import api.webrtc_server.repository.ServerRepository;
import api.webrtc_server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    private final ChannelRepository channelRepository;
    private final ServerRepository serverRepository;
    private final UserRepository userRepository;  // UserRepository 추가

    public ChannelController(ChannelRepository channelRepository,
                             ServerRepository serverRepository,
                             UserRepository userRepository) {  // 생성자에 추가
        this.channelRepository = channelRepository;
        this.serverRepository = serverRepository;
        this.userRepository = userRepository;
    }

    // 모든 채널 조회
    @GetMapping
    public List<ChannelDTO> getAllChannels() {
        List<ChannelEntity> channels = channelRepository.findAll();

        // Entity를 DTO로 변환
        return channels.stream()
                .map(channel -> new ChannelDTO(
                        channel.getChannelId(),
                        channel.getChannelName(),
                        channel.getChannelType().name(),
                        channel.getUserId(),
                        channel.getParticipantIds()  // 참여자 목록도 포함
                ))
                .collect(Collectors.toList());
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
        channel.setChannelName(channelDTO.getChannelName
());
        channel.setChannelType(ChannelEntity.ChannelType.valueOf(channelDTO.getChannelType().toUpperCase()));

        return channelRepository.save(channel);
    }
    // dm 채널 생성
    @PostMapping("/dm/{userId}")
    public ChannelEntity createDMChannel(
            @PathVariable Long userId,
            @RequestBody ChannelDTO channelDTO) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // DM 채널은 서버에 속하지 않으므로 서버는 null로 설정됩니다
        ChannelEntity channel = new ChannelEntity();
        channel.setServer(null);  // DM 채널은 서버에 속하지 않음
        channel.setChannelName(channelDTO.getChannelName());
        channel.setChannelType(ChannelEntity.ChannelType.DM);  // DM 타입으로 설정
        channel.setUserId(userId);  // 채널 생성한 사용자 ID 설정

        channel.addParticipant(userId);

        if (channelDTO.getParticipantIds() != null && !channelDTO.getParticipantIds().isEmpty()) {
            for (Long participantId : channelDTO.getParticipantIds()) {
                channel.addParticipant(participantId);

                // 추가된 참여자의 participatingChannelIds도 업데이트
                UserEntity participant = userRepository.findById(participantId)
                        .orElseThrow(() -> new IllegalArgumentException("Participant not found with ID: " + participantId));
                participant.getParticipatingChannelIds().add(channel.getChannelId());
                userRepository.save(participant);
            }
        }
        // 채널저장
        channel = channelRepository.save(channel);

        List<Long> participatingChannels = user.getParticipatingChannelIds();
        if (participatingChannels == null) {
            participatingChannels = new ArrayList<>();
        }
        participatingChannels.add(channel.getChannelId());
        user.setParticipatingChannelIds(participatingChannels);
        userRepository.save(user);

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
                .map(channel ->new ChannelDTO(
                        channel.getChannelId(),
                        channel.getChannelName(),
                        channel.getChannelType().name(),
                        channel.getUserId()

                )).collect(Collectors.toList());
    }

    // 채널id로 특정 채널 조회
    @GetMapping("/dm/{channelId}")
    public ChannelDTO getChannelById(@PathVariable Long channelId) {
        ChannelEntity channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel not found with ID: " + channelId));

        return new ChannelDTO(
                channel.getChannelId(),
                channel.getChannelName(),
                channel.getChannelType().name(),
                channel.getUserId(),
                channel.getParticipantIds()
        );
    }

    // dm 삭제
    @DeleteMapping("/dm/{channelId}/users/{userId}")
    public ResponseEntity<?> removeUserFromDMChannel(
            @PathVariable Long channelId,
            @PathVariable Long userId) {

        // 채널 존재 확인
        ChannelEntity channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel not found with ID: " + channelId));

        // 사용자 존재 확인
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // DM 채널인지 확인
        if (channel.getChannelType() != ChannelEntity.ChannelType.DM) {
            throw new IllegalArgumentException("Channel is not a DM channel");
        }

        // 채널의 participantIds에서 사용자 제거
        channel.removeParticipant(userId);
        channelRepository.save(channel);

        // 사용자의 participatingChannelIds에서 채널 제거
        List<Long> participatingChannels = user.getParticipatingChannelIds();
        participatingChannels.remove(channelId);
        userRepository.save(user);

        return ResponseEntity.ok()
                .body(Map.of(
                        "message", "User successfully removed from DM channel",
                        "remainingParticipants", channel.getParticipantIds().size()
                ));
    }

}
