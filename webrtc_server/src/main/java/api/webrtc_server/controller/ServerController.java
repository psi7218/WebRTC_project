package api.webrtc_server.controller;

import api.webrtc_server.dto.ServerDTO;
import api.webrtc_server.entity.ServerEntity;
import api.webrtc_server.entity.UserEntity;
import api.webrtc_server.repository.ServerRepository;
import api.webrtc_server.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/servers")
public class ServerController {

    private final ServerRepository serverRepository;
    private final UserRepository userRepository;

    public ServerController(ServerRepository serverRepository, UserRepository userRepository) {
        this.serverRepository = serverRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ServerEntity createServer(@RequestBody ServerDTO serverDTO) {
        UserEntity serverAdmin = userRepository.findById(serverDTO.getServerAdminId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + serverDTO.getServerAdminId()));


        ServerEntity server = new ServerEntity();
        server.setServerName(serverDTO.getServerName());
        server.setServerThumbnail(serverDTO.getImage());
        server.setServerAdmin(serverAdmin);

        return serverRepository.save(server);
    }

}
