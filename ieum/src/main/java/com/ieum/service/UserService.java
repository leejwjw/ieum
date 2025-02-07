package com.ieum.service;

import com.ieum.domain.Nation;
import com.ieum.domain.User;
import com.ieum.dto.UserDTO;
import com.ieum.repository.NationRepository;
import com.ieum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final NationRepository nationRepository;
    private final UserRepository userRepository;

    public List<Nation> getAllNations() {
        return nationRepository.findAll();
    }

    public UserDTO getUser(String username) {
        User user = userRepository.findById(username).get();
        UserDTO userDTO = entityToDTO(user);
        return userDTO;
    }
    public UserDTO entityToDTO(User user) {
        UserDTO userDTO = new UserDTO(
                user.getUSERNAME(),
                user.getNICK_NAME(),
                user.getKEYWORD(),
                user.getNATION_NAME(),
                user.getLANG(),
                user.getIS_PUBLIC(),
                user.getIS_USER(),
                user.getPHOTO_PATH(),
                user.getREG_DATE(),
                String.valueOf(user.getSTATUS())
        );
        return userDTO;
    }
}
