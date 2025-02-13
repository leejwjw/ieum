package com.ieum.service;

import com.ieum.domain.User;
import com.ieum.domain.UserStatus;
import com.ieum.dto.UserDTO;
import com.ieum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class KakaoAuthService {

    private final UserRepository userRepository;

    public UserDTO getKakaoUser(String accessToken) throws Exception  {
        try {
        String email = getKakaoAccessTokenEmail(accessToken);
        log.info("getKakaoUser - email : {}", email);

        Optional<User> findMember = userRepository.findById(email);
        // 값이 존재할 경우 = 기존 회원
        if(findMember.isPresent()) {
            User user = findMember.get();

            // 최초 로그인 시 isUser 값을 업데이트 (새로운 회원에서 기존 회원으로 전환)
            if (!user.getIS_USER()) {
                user.setIS_USER(true); // 상태 업데이트
                userRepository.save(user); // DB에 반영
            }

            // DTO로 변환하여 반환
            UserDTO userDTO = entityToDTO(user);


            return userDTO;
        }
        // 기존 회원이 아니다 -> 임시 닉네임으로 User 엔티티 생성해 DB에 저장 & DTO리턴
        User socialUser = makeSocialUser(email);
        userRepository.save(socialUser);
        UserDTO socialUserDTO = entityToDTO(socialUser);

        return socialUserDTO;
        } catch (Exception e) {
            // 예외 처리, 로그 찍기
            System.err.println("카카오 API 호출 중 오류 발생: " + e.getMessage());
            throw new Exception("카카오 API 호출 중 오류 발생", e);
        }
    }

// 정보 수정


    // 카카오에 사용자 정보 요청
    private String getKakaoAccessTokenEmail(String accessToken) {
        // 카카오 사용자 정보 요청 URL
        String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

        if(accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        // 카카오 서버에 HTTP 요청
        RestTemplate restTemplate = new RestTemplate();
        // 헤더정보 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        // 헤더 정보 포함해 HttpEntity 객체 생성
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // 요청 경로 생성해주는 클래스 이용
        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(KAKAO_USER_INFO_URL).build();
        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);
        log.info(" MemberService - response : {}", response);
        LinkedHashMap<String, LinkedHashMap> responseBody = response.getBody();
        log.info(" MemberService - responseBody : {}", responseBody);
        // 응답 내용중 카카오 계정 정보 꺼낼 수 있다.
        LinkedHashMap<String, String> kakaoAccount = responseBody.get("kakao_account");
        log.info(" MemberService - kakaoAccount : {}", kakaoAccount);
        return kakaoAccount.get("email"); // 이메일만 꺼내서 리턴
    }

    // User 엔티티 -> UserDTO 변환 default 메서드
    public UserDTO entityToDTO(User user) {
        // User의 관심사 리스트 (List<UserInterest>)를 관련된 Interest ID만 추출하여 리스트로 변환
        List<Long> interestIds = user.getINTEREST().stream()
                .map(userInterest -> userInterest.getInterest().getInterestId()) // InterestId 추출
                .collect(Collectors.toList());

        UserDTO userDTO = new UserDTO(
                user.getUsername(),
                user.getNICK_NAME(),
                user.getKEYWORD(),
                user.getNATION_NAME(),
                user.getADDRESS(),
                user.getLANG(),
                user.getINTRO(),
                user.getIS_PUBLIC(),
                user.getIS_USER(),
                user.getPHOTO_PATH(),
                user.getREG_DATE(),
                String.valueOf(user.getSTATUS()),
                interestIds
        );
        return userDTO;
    }

    public boolean isUserExists(String email) {
        return userRepository.findById(email).isPresent();
    }

    // 이메일이 존재하지 않을 경우, User엔티티 생성해주는 메서드
    private User makeSocialUser(String email) {
        String nickName = "Social_" + email.split("@")[0]; // 이메일을 기반으로 임의 닉네임 생성
        User user = User.builder()
                .username(email)
                .NICK_NAME(nickName)
                .IS_PUBLIC(true)
                .STATUS(UserStatus.ACTIVE)
                .IS_USER(false)
                .build();
        return user;
    }
}
