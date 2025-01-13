package api.webrtc_server.repository;

import api.webrtc_server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    List<UserEntity> findByUsernameContainingIgnoreCase(String keyword);
}
