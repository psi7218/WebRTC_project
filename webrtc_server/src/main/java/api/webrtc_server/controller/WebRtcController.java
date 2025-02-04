package api.webrtc_server.controller;

import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import api.webrtc_server.entity.ChannelEntity;
import api.webrtc_server.entity.ChannelEntity.ChannelType;
import api.webrtc_server.repository.ChannelRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/webrtc")
public class WebRtcController {

    private final OpenVidu openvidu;
    private final ChannelRepository channelRepository;

    @Autowired
    public WebRtcController(OpenVidu openvidu, ChannelRepository channelRepository) {
        this.openvidu = openvidu;
        this.channelRepository = channelRepository;
    }

    // 세션 생성
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return ResponseEntity.ok(session.getSessionId());
    }

    @PostMapping("/sessions/{channelId}/connections")
    public ResponseEntity<String> createConnection(
            @PathVariable("channelId") String channelId,
            @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
                
        ChannelEntity channel = channelRepository.findById(Long.parseLong(channelId))
        .orElseThrow(() -> new IllegalArgumentException("Channel not found"));

        if (channel.getChannelType() != ChannelType.VOICE) {
            throw new IllegalArgumentException("Not a voice channel");
        }

        // 2) 세션이 없다면, 다시 생성
        try {
            // 2. 기존 활성 세션이 있는지 확인
            Session session = openvidu.getActiveSession(channelId);

            // 3. 없으면 새로 생성
            if (session == null) {
                SessionProperties properties = SessionProperties.fromJson(params).build();
                session = openvidu.createSession(properties);
            }


            // 4. 커넥션(토큰) 생성
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);

            return ResponseEntity.ok(connection.getToken());
            
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new RuntimeException("Failed to create connection", e);
        }
    }
}