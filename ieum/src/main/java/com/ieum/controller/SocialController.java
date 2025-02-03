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
    @PostMapping("/getkakaoUser")
    public ResponseEntity<Map<String, Object>> getKakaoUser(@RequestBody Map<String, String> request) {

        // 카카오 accessToken 저장
        String accessToken = request.get("accessToken");

        // accessToken이 없으면 오류 처리
        if (accessToken == null || accessToken.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Access Token이 없습니다."));
        }

        try {
            // 카카오 사용자 정보 요청
            UserDTO userDTO  = kakaoAuthService.getKakaoUserInfo(accessToken);
            Map<String, Object> claims = userDTO.getClaims();
            String jwtAccessToken = JWTUtil.generateToken(claims,10);
            String jwtRefreshToken = JWTUtil.generateToken(claims,60 * 24);
            claims.put("jwtAccessToken", jwtAccessToken);
            claims.put("jwtRefreshToken", jwtRefreshToken);

            // 사용자 정보 반환
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "카카오 사용자 정보 요청 중 오류 발생"));
        }
    }
}
