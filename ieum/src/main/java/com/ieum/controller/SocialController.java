package com.ieum.controller;

import com.ieum.dto.UserDTO;
import com.ieum.service.KakaoAuthService;
import com.ieum.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class SocialController {

    private final KakaoAuthService kakaoAuthService;

    // 화면에서 받은 accessToken을 통해 사용자 정보 요청
    @GetMapping("/kakaoLogin")
    public Map<String, Object> getUserKakao(String accessToken) throws Exception {
        log.info("************* SocialController - accessToken : {}", accessToken);

        // accessToken이 없으면 오류 처리
        if (accessToken == null || accessToken.isEmpty()) {
            log.info("accessToken empty");
        }


        UserDTO userDTO = kakaoAuthService.getKakaoUser(accessToken);
        Map<String, Object> claims = userDTO.getClaims();
        String jwtAccessToken = JWTUtil.generateToken(claims, 6000);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }
}
