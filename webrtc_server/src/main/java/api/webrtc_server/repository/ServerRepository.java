package api.webrtc_server.repository;

import api.webrtc_server.entity.ServerEntity;
import api.webrtc_server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<ServerEntity, Long> {
    List<ServerEntity> findByServerAdmin(UserEntity serverAdmin);
}