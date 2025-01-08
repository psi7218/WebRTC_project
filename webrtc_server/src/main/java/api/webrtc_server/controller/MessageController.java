package api.webrtc_server.controller;

import api.webrtc_server.dto.MessageDTO;
import api.webrtc_server.entity.ChannelEntity;
import api.webrtc_server.entity.MessageEntity;
import api.webrtc_server.entity.UserEntity;
import api.webrtc_server.repository.ChannelRepository;
import api.webrtc_server.repository.MessageRepository;
import api.webrtc_server.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;

    public MessageController(MessageRepository messageRepository, ChannelRepository channelRepository) {
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
    }

    // WebSocket을 통한 메시지 송신
    @MessageMapping("/channel/{channelId}/send")
    @SendTo("/topic/channel/{channelId}")
    public MessageEntity sendChannelMessage(
            @DestinationVariable Long channelId,
            @Payload MessageDTO messageDTO) {
        logger.info("Received Message: {}", messageDTO);

        MessageEntity message = new MessageEntity();
        message.setChannelId(channelId);
        message.setUserId(messageDTO.getUserId());
        message.setContent(messageDTO.getContent());
        message.setCreatedAt(LocalDateTime.now());

        return messageRepository.save(message);
    }

    // REST API를 통한 메시지 전송
    @PostMapping
    public MessageEntity sendMessage(
            @RequestBody Long userId,
            @RequestBody Long channelId,
            @RequestBody String content) {

        ChannelEntity channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel not found"));

        MessageEntity message = new MessageEntity();

        message.setUserId(userId);
        message.setChannelId(channelId);
        message.setContent(content);
        message.setCreatedAt(LocalDateTime.now());

        return messageRepository.save(message);
    }

    // 특정 채널의 메시지 조회
    @GetMapping("/channel/{channelId}")
    public List<MessageEntity> getChannelMessages(@PathVariable Long channelId) {
        return messageRepository.findAllByChannelId(channelId);
    }
}
