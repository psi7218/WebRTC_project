package api.webrtc_server.repository;

import api.webrtc_server.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {

    // 채널별 메시지 조회
    List<MessageEntity> findAllByChannelId(Long channelId);

}
