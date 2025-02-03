package com.ieum.util;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Slf4j
public class JWTUtil {

    private static String key; // 메모리에 저장된 비밀 키

    static {
        regenerateKey(); // 클래스 로드 시 SecretKey 생성
    }

    // JWT Secret Key 생성
    public static void regenerateKey() {
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32]; // 32바이트 키
        random.nextBytes(keyBytes);
        key = Base64.getEncoder().encodeToString(keyBytes);
        log.info("New SecretKey Generated: {}", key);
    }

    // JWT 토큰 생성
    public static String generateToken(Map<String, Object> valueMap, int min) {
        try {
            // HmacSHA256 알고리즘 기반으로 SecretKey 생성
            SecretKey secretKey = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
            log.info("SecretKey 생성 완료: {}", secretKey);

            // JWT 토큰 생성
            String jwtStr = Jwts.builder()
                    .setHeader(Map.of("typ", "JWT")) // 헤더 설정
                    .setClaims(valueMap)             // 클레임 설정
                    .setIssuedAt(new Date(System.currentTimeMillis())) // 현재 발행 시간
                    .setExpiration(new Date(System.currentTimeMillis() + min * 60 * 1000)) // 토큰 만료 시간
                    .signWith(secretKey, SignatureAlgorithm.HS256) // 서명 , 서명시 알고리즘 명시
                    .compact();
            log.info("JWT 생성 완료: {}", jwtStr);
            return jwtStr;
        } catch (Exception e) {
            log.error("JWT 생성 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("JWT 생성 중 오류 발생", e);
        }
    }

    // 토큰 검증 메서드
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;
        try {
            // HmacSHA256 알고리즘 기반으로 SecretKey 생성
            SecretKey secretKey = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
            log.info("ValidateToken SecretKey 생성 완료: {}", secretKey);

            claim = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token) // jwt 파싱 및 검증 -> 실패시 에러발생
                    .getBody(); // 토큰에 저장된 claims 꺼내기
        } catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("Malformed"); // 잘못된 형식의 토큰
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("Expired"); // 만료된 토큰
        } catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("Invalid"); // 유효하지 않은 Claim
        } catch (JwtException jwtException) {
            throw new CustomJWTException("JWTError"); // 그 외 JWT관련 예외
        } catch (Exception e) {
            throw new CustomJWTException("Error"); //  나머지 예외
        }
        return claim;
    }
}
