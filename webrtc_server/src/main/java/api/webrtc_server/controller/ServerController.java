package api.webrtc_server.controller;

import api.webrtc_server.config.NotificationConfig;
import api.webrtc_server.dto.ChannelDTO;
import api.webrtc_server.dto.CreateServerDTO;
import api.webrtc_server.dto.ServerDTO;
import api.webrtc_server.entity.ChannelEntity;
import api.webrtc_server.entity.ServerEntity;
import api.webrtc_server.entity.UserEntity;
import api.webrtc_server.repository.ChannelRepository;
import api.webrtc_server.repository.ServerRepository;
import api.webrtc_server.repository.UserRepository;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.SessionProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    private final ServerRepository serverRepository;
    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final OpenVidu openVidu;

    @Autowired
    public ServerController(ServerRepository serverRepository, UserRepository userRepository, ChannelRepository channelRepository, OpenVidu openVidu) {
        this.serverRepository = serverRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
        this.openVidu = openVidu;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<ServerDTO> createServer(@RequestBody CreateServerDTO createServerDTO) {
        try {

            System.out.println("Starting server creation process...");
            System.out.println("CreateServerDTO: " + createServerDTO);
            // 관리자 사용자 찾기
            UserEntity serverAdmin = userRepository.findById(createServerDTO.getServerAdminId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + createServerDTO.getServerAdminId()));
            System.out.println("serverAdmin: " + serverAdmin);
                
            // 새 서버 엔티티 생성
            ServerEntity server = new ServerEntity();
            server.setServerName(createServerDTO.getServerName());
            server.setServerAdmin(serverAdmin);
            server.setServerThumbnail(createServerDTO.getServerThumbnail());

            server = serverRepository.save(server);

            // 기본 채널 리스트 생성
            List<ChannelEntity> defaultChannels = new ArrayList<>();
            System.out.println("채팅채널 생성");
            // 일반 채팅 채널 생성
            ChannelEntity chattingChannel = new ChannelEntity();
            chattingChannel.setChannelName("일반");
            chattingChannel.setChannelType(ChannelEntity.ChannelType.CHATTING);
            chattingChannel.setServer(server);
            chattingChannel.setUserId(serverAdmin.getUserId());
            defaultChannels.add(chattingChannel);

            chattingChannel = channelRepository.save(chattingChannel);

            // 음성 채널 생성
            ChannelEntity voiceChannel = new ChannelEntity();
            voiceChannel.setChannelName("음성 채널");
            voiceChannel.setChannelType(ChannelEntity.ChannelType.VOICE);
            voiceChannel.setServer(server);
            voiceChannel.setUserId(serverAdmin.getUserId());
            defaultChannels.add(voiceChannel);
            System.out.println("음성채널 생성");
            // 서버에 채널 리스트 설정
            voiceChannel = channelRepository.save(voiceChannel);

            if (voiceChannel.getChannelType() == ChannelEntity.ChannelType.VOICE) {
                try {
                    String sessionId = voiceChannel.getChannelId().toString(); // channelId를 sessionId로 사용
                    System.out.println("Attempting to create OpenVidu session with ID: " + sessionId);
                    System.out.println("OpenVidu URL: " + openVidu.toString());
                    
                    SessionProperties props = new SessionProperties.Builder()
                            .customSessionId(sessionId) // channelId를 세션 ID로 사용
                            .build();
                    openVidu.createSession(props);
                    // OpenVidu 세션 ID는 channelId를 사용하므로 별도로 저장할 필요 없음
                } catch (OpenViduJavaClientException | OpenViduHttpException e) {
                    e.printStackTrace();
                    // 세션 생성 실패 시, 음성 채널 삭제
                    channelRepository.delete(voiceChannel);
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create OpenVidu session: " + e.getMessage());
                }
            }

            server.setChannels(defaultChannels);
            // 저장
            server = serverRepository.save(server);

            // DTO로 변환하여 반환
            return ResponseEntity.ok(new ServerDTO(
                    server.getServerId(),
                    server.getServerName(),
                    serverAdmin.getUserId(),
                    server.getServerThumbnail(),
                    server.getChannels().stream()
                            .map(channel -> new ChannelDTO(
                                    channel.getChannelId(),
                                    channel.getChannelName(),
                                    channel.getChannelType().name(),
                                    channel.getUserId()
                            ))
                            .collect(Collectors.toList())
            ));

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ServerDTO>> getAllServers() {
        try {
            List<ServerEntity> servers = serverRepository.findAll();
            List<ServerDTO> serverDTOs = servers.stream()
                    .map(server -> {
                        Long adminUserId = server.getServerAdmin() != null ?
                                server.getServerAdmin().getUserId() : 0L;

                        return new ServerDTO(
                                server.getServerId(),
                                server.getServerName(),
                                adminUserId,
                                server.getServerThumbnail(),
                                server.getChannels() != null ?
                                        server.getChannels().stream()
                                                .map(channel -> new ChannelDTO(
                                                        channel.getChannelId(),
                                                        channel.getChannelName(),
                                                        channel.getChannelType().name(),
                                                        adminUserId
                                                ))
                                                .collect(Collectors.toList())
                                        : new ArrayList<>()
                        );
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(serverDTOs);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // 특정 유저의 참여중인 서버 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getServersByUserId(@PathVariable Long userId) {
        try {
            // 먼저 해당 유저가 존재하는지 확인
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

            // 해당 유저가 관리자인 서버들을 찾음
            List<ServerEntity> userServers = serverRepository.findByServerAdmin(user);

            List<ServerDTO> serverDTOs = userServers.stream()
                    .map(server -> new ServerDTO(
                            server.getServerId(),
                            server.getServerName(),
                            userId,  // 현재 유저의 ID
                            server.getServerThumbnail(),
                            server.getChannels() != null ?
                                    server.getChannels().stream()
                                            .map(channel -> new ChannelDTO(
                                                    channel.getChannelId(),
                                                    channel.getChannelName(),
                                                    channel.getChannelType().name(),
                                                    userId  // 현재 유저의 ID
                                            ))
                                            .collect(Collectors.toList())
                                    : new ArrayList<>()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(serverDTOs);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error finding servers: " + e.getMessage()));
        }
    }

    //특정서버 조회
    @GetMapping("/{serverId}")
    public ResponseEntity<?> getServerById(@PathVariable Long serverId) {
        try {
            // 서버 존재 여부 확인
            ServerEntity server = serverRepository.findById(serverId)
                    .orElseThrow(() -> new IllegalArgumentException("Server not found with ID: " + serverId));

            // ServerDTO로 변환
            ServerDTO serverDTO = new ServerDTO(
                    server.getServerId(),
                    server.getServerName(),
                    server.getServerAdmin() != null ? server.getServerAdmin().getUserId() : 0L,
                    server.getServerThumbnail(),
                    server.getChannels() != null ?
                            server.getChannels().stream()
                                    .map(channel -> new ChannelDTO(
                                            channel.getChannelId(),
                                            channel.getChannelName(),
                                            channel.getChannelType().name(),
                                            server.getServerAdmin() != null ? server.getServerAdmin().getUserId() : 0L
                                    ))
                                    .collect(Collectors.toList())
                            : new ArrayList<>()
            );

            return ResponseEntity.ok(serverDTO);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error finding server: " + e.getMessage()));
        }
    }

    // 특정 서버 삭제
    @DeleteMapping("/{serverId}")
    public ResponseEntity<?> deleteServer(@PathVariable Long serverId) {
        try {
            // 서버가 존재하는지 확인
            ServerEntity server = serverRepository.findById(serverId)
                    .orElseThrow(() -> new IllegalArgumentException("서버를 찾을 수 없습니다. ID: " + serverId));

            // 서버 삭제
            serverRepository.delete(server);

            return ResponseEntity.ok()
                    .body(Collections.singletonMap("message", "서버가 성공적으로 삭제되었습니다. ID: " + serverId));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "서버 삭제 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    // ServerController에 주입 추가
    @Autowired
    private NotificationConfig notificationConfig;

    // 구독 엔드포인트 추가
    @GetMapping("/subscribe/{userId}")
    @ResponseBody
    public SseEmitter subscribeToServerEvents(@PathVariable Long userId) {
        return notificationConfig.subscribe(userId);
    }

    // 초대하기 로직 수정
    @PostMapping("/{serverId}/invite/{userId}")
    public ResponseEntity<?> inviteUserToServer(
            @PathVariable Long serverId,
            @PathVariable Long userId) {
        try {
            // 서버 존재 확인
            ServerEntity server = serverRepository.findById(serverId)
                    .orElseThrow(() -> new IllegalArgumentException("Server not found with ID: " + serverId));

            // 초대받을 유저 존재 확인
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

            // 알림 데이터 생성
            Map<String, Object> notificationData = new HashMap<>();
            notificationData.put("type", "SERVER_INVITE");
            notificationData.put("serverId", serverId);
            notificationData.put("serverName", server.getServerName());
            notificationData.put("invitedBy", server.getServerAdmin().getUserId());

            // SSE를 통해 알림 전송
            notificationConfig.sendNotification(userId, notificationData);

            return ResponseEntity.ok()
                    .body(Collections.singletonMap("message", "Invitation sent to user: " + userId));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error sending invitation: " + e.getMessage()));
        }
    }

    // 초대 수락 로직 수정
    @PostMapping("/{serverId}/accept/{userId}")
    public ResponseEntity<?> acceptServerInvitation(
            @PathVariable Long serverId,
            @PathVariable Long userId) {
        try {
            // 서버 존재 확인
            ServerEntity server = serverRepository.findById(serverId)
                    .orElseThrow(() -> new IllegalArgumentException("Server not found with ID: " + serverId));

            // 유저 존재 확인
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

            // UserEntity에 서버 추가 로직 필요하면 여기에 구현
            // TODO: user.addServer(server) 같은 메서드 호출

            // 수락 완료 알림 전송
            Map<String, Object> notificationData = new HashMap<>();
            notificationData.put("type", "SERVER_INVITE_ACCEPTED");
            notificationData.put("serverId", serverId);
            notificationData.put("serverName", server.getServerName());
            notificationData.put("acceptedBy", userId);

            // 서버 관리자에게 알림 전송
            notificationConfig.sendNotification(server.getServerAdmin().getUserId(), notificationData);

            return ResponseEntity.ok()
                    .body(Collections.singletonMap("message", "User " + userId + " joined server " + serverId));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error accepting invitation: " + e.getMessage()));
        }
    }
}
