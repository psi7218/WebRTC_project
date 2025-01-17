package api.webrtc_server.controller;

import api.webrtc_server.dto.LoginRequest;
import api.webrtc_server.dto.UserDTO;
import api.webrtc_server.entity.UserEntity;
import api.webrtc_server.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        // Entity -> DTO 변환
        return userEntities.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/search")
    public List<UserDTO> searchUsers(@RequestParam String keyword) {
        List<UserEntity> users = userRepository.findByUsernameContainingIgnoreCase(keyword);
        return users.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmailAvailability(@RequestParam String email) {
        UserEntity user = userRepository.findByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("available", user == null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return entityToDTO(user);
    }


    // 친구 추가
    @PostMapping("/{userId}/friends/{friendId}")
    public UserDTO addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserEntity friend = userRepository.findById(friendId)
                .orElseThrow(() -> new RuntimeException("Friend not found"));

        // 양방향 친구 추가
        user.addFriend(friend);

        // DB 저장
        userRepository.save(user);    // user 변경됨
        userRepository.save(friend);  // friend 도 친구 목록 바뀔 수 있음

        // 최종적으로 user의 DTO를 반환
        return entityToDTO(user);
    }
    
    // 회원가입
    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        // DTO -> Entity
        UserEntity entity = dtoToEntity(userDTO);
        // profileImage, friends 등은 Entity에 기본값이 있으므로 세팅 없이 저장
        UserEntity savedEntity = userRepository.save(entity);
        // 다시 Entity -> DTO 로 응답
        return entityToDTO(savedEntity);
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginRequest loginRequest) {
        // 이메일로 사용자 조회
        UserEntity user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            // email이 없으면 예외 (혹은 null 반환, status 401 등)
            throw new RuntimeException("User not found");
        }

        // 비밀번호 검증 (실무에선 해시 비교 등을 해야 함)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 로그인 성공 -> 해당 사용자 정보를 DTO로 변환해 응답
        return entityToDTO(user);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        // 1) 존재하는지 확인
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2) 삭제
        userRepository.delete(user);

        // 3) 응답
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    private UserDTO entityToDTO(UserEntity entity) {
        if (entity == null) return null;
        UserDTO dto = new UserDTO();
        dto.setUserId(entity.getUserId());
        dto.setUsername(entity.getUsername());
//        dto.setPassword(entity.getPassword());
        dto.setEmail(entity.getEmail());
        dto.setProfileImage(entity.getProfileImage());
        dto.setThumbnailColor(entity.getThumbnailColor());
        // friends -> friendIds
        List<Long> friendIds = entity.getFriends().stream()
                .map(UserEntity::getUserId)
                .collect(Collectors.toList());
        dto.setFriendIds(friendIds);
        dto.setParticipatingChannelIds(entity.getParticipatingChannelIds());
        return dto;
    }
    private UserEntity dtoToEntity(UserDTO dto) {
        if (dto == null) return null;
        UserEntity entity = new UserEntity();
        // userId가 null이면 새로운 유저, 값이 있으면 수정(주의: 실무에서는 update/merge 처리에 유의)
        entity.setUserId(dto.getUserId());
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setProfileImage(dto.getProfileImage());
        entity.setThumbnailColor(dto.getThumbnailColor());
        entity.setParticipatingChannelIds(dto.getParticipatingChannelIds());
        // friends는 여기서 바로 세팅하지 않고 addFriend 로 관리
        return entity;
    }
}
