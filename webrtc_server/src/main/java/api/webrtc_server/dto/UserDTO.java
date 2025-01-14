package api.webrtc_server.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String profileImage;
    private String thumbnailColor = "#5865F2";
    private List<Long> friendIds; // 실제로는 friend 전체 정보를 담을 수도 있음

    // --- Getter & Setter ---
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
        this.profileImage = profileImage;
    }

    public List<Long> getFriendIds() {
        return friendIds;
    }
    public void setFriendIds(List<Long> friendIds) {
        this.friendIds = friendIds;
    }
    public String getThumbnailColor() {
        return thumbnailColor;
    }

    public void setThumbnailColor(String thumbnailColor) {
        this.thumbnailColor = thumbnailColor;
    }

}
