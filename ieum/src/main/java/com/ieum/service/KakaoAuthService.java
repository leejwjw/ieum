package com.ieum.service;

import com.ieum.domain.User;
import com.ieum.domain.UserStatus;
import com.ieum.dto.UserDTO;
import com.ieum.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.Optional;

@Service
@Slf4j
public class KakaoAuthService {

    private final UserRepository userRepository;
    @Value("${kakao.auth.rest-api-key}")
    private String KAKAO_REST_API; // 카카오 REST API 키

    public KakaoAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO getKakaoUserInfo(String accessToken) {
        String email = getKakaoUser(accessToken);

        Optional<User> findUser = userRepository.findById(email);
        // 기존 회원일 경우
        if (findUser.isPresent()) {
            UserDTO userDTO = entityToDTO(findUser.get());
            return userDTO;
        }
        // 기존 회원이 아닐 경우
        User socialUser =  makeSocialUser(email);
        userRepository.save(socialUser);
        UserDTO socialUserDTO = entityToDTO(socialUser);

        return socialUserDTO;
    }





    public String getKakaoUser(String accessToken) {
        // 카카오 사용자 정보 조회 API URL
        String KAKAO_API_URL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(KAKAO_API_URL).build();
        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);
        LinkedHashMap<String, LinkedHashMap> responseBody = response.getBody();
        LinkedHashMap<String, String> kakaoAccount = responseBody.get("kakao_account");

        return kakaoAccount.get("email");
    }

    // User 엔티티 -> UserDTO 변환 default 메서드
    public UserDTO entityToDTO(User User) {
        UserDTO UserDTO = new UserDTO(
                User.getUSERNAME(),
                User.getNICK_NAME(),
                User.getKEYWORD(),
                User.getNATION_NAME(),
                User.isIS_PUBLIC(),
                User.getPHOTO(),
                User.getREG_DATE(),
                String.valueOf(User.getSTATUS())
        );
        return UserDTO;
    }


    // 이메일이 존재하지 않을 경우, User엔티티 생성해주는 메서드
    private User makeSocialUser(String email) {
        String nickName = "Social User"; // 임의의 닉네임 생성
        User user = User.builder()
                .USERNAME(email)
                .NICK_NAME(nickName)
                .STATUS(UserStatus.ACTIVE)
                .build();
        return user;
    }
}
