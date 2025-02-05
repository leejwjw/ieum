package com.ieum.controller;

import com.ieum.dto.UserDTO;
import com.ieum.service.KakaoAuthService;
import com.ieum.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class SocialController {

    private final KakaoAuthService kakaoAuthService;

    // 화면에서 받은 accessToken을 통해 사용자 정보 요청
    public Map<String, Object> getMemberFromKakao(String accessToken) {
        log.info("************* SocialController - accessToken : {}", accessToken);

        // accessToken이 없으면 오류 처리
        if (accessToken == null || accessToken.isEmpty()) {
            log.info("accessToken empty");
        }


        UserDTO userDTO = kakaoAuthService.getKakaoUser(accessToken);
        Map<String, Object> claims = userDTO.getClaims();
        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }
}
