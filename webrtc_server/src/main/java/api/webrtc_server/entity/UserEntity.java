package api.webrtc_server.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_entity")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String username;
    private String email;

    @Column(nullable = false)
    private String password;
    private String profileImage = "";

    @Column(nullable = false)
    private String thumbnailColor = "#5865F2";

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),   // 본인의 컬럼
            inverseJoinColumns = @JoinColumn(name = "friend_id") // 친구 컬럼
    )
    private List<UserEntity> friends = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "user_participating_channels",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "channel_id")
    private List<Long> participatingChannelIds = new ArrayList<>();

    // Getter and Setter

    public List<Long> getParticipatingChannelIds() {
        return participatingChannelIds;
    }

    public void setParticipatingChannelIds(List<Long> participatingChannelIds) {
        this.participatingChannelIds = participatingChannelIds;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = (profileImage == null) ? "" : profileImage;
    }

    public String getThumbnailColor() {
        return thumbnailColor;
    }

    public void setThumbnailColor(String thumbnailColor) {
        this.thumbnailColor = thumbnailColor;
    }

    public List<UserEntity> getFriends() {
        return friends;
    }
    public void setFriends(List<UserEntity> friends) {
        this.friends = friends;
    }

    // 친구 추가 편의 메서드
    public void addFriend(UserEntity friend) {
        // 이미 friends 목록에 없는 경우만 추가
        if (!this.friends.contains(friend)) {
            this.friends.add(friend);
            friend.getFriends().add(this); // 양방향
        }
    }
}
