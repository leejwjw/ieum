package com.ieum.security.filter;

import com.google.gson.Gson;
import com.ieum.dto.UserDTO;
import com.ieum.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        // preflight 제외
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }

        String requestURI = request.getRequestURI();

        // 이미지 조회 경로 체크 제외
        if(requestURI.startsWith("/user/view/")) {
            return true;
        }
        return false;
    }

    // 필터링 메서드 : 오버라이딩 필수
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 특정 경로는 필터를 건너뛴다.
        String path = request.getRequestURI();
        if (path.equals("/api/auth/kakaoLogin")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (path.equals("/ws/chat")) {
            filterChain.doFilter(request, response);
            return;
        }

        log.info("*********** JWTCheckFilter - doFilterInternal");

        String authHeaderValue = request.getHeader("Authorization");
        // Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IiQyYSQxMC....
        String accessToken = authHeaderValue.substring(7);

        if (accessToken != null) {
            try {
                Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 예외 발생가능
                log.info("JWTCheckFilter - doFilterInternal cliams : {}", claims);

                String username = (String) claims.get("username");
                String nickname = (String) claims.get("nickname");
                String keyword = (String) claims.get("keyword");
                String nation =  (String) claims.get("nation");
                String lang =  (String) claims.get("lang");
                Boolean isPublic = (Boolean) claims.get("isPublic");
                Boolean isUser = (Boolean) claims.get("isUser");
                String photoPath = (String) claims.get("photo_path");
                LocalDateTime regDate = (LocalDateTime) claims.get("reg_date");
                String status =  (String) claims.get("status");


                // AccessToken에 저장된 사용자 정보를 꺼내서 UserDetails타입인 UserDTO에 정보 담아 생성
                UserDTO userDTO = new UserDTO(username, nickname, keyword, nation, lang, isPublic, isUser, photoPath, regDate, status);
                log.info("JWTCheckFilter - AccessToken to userDTO : {}", userDTO);

                // Authentication 객체 생성 (시큐리티 인증)
                // SNS 로그인에서는 비밀번호가 없으므로 null로 설정, 권한도 없으므로 빈 문자열
                UsernamePasswordAuthenticationToken authenticationToken
                        = new UsernamePasswordAuthenticationToken(userDTO, null,new ArrayList<>());

                // 시큐리티 컨텍스트에 토큰 추가 (시큐리티로 로그인한 효과)
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);


                filterChain.doFilter(request, response); // 다음 필터로 진행~
            }catch (Exception e) {
                // 검증 예외 처리 : AccessToken 검증하다 예외발생하면 JSON으로 에레메세지 전송
                log.info("*********** JWT Check Error!! ");
                log.info(e.getMessage());
                Gson gson = new Gson();
                String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
                response.setContentType("application/json");
                PrintWriter writer = response.getWriter();
                writer.println(msg);
                writer.close();
            }
        } else {
            // JWT 토큰이 없으면 인증되지 않은 상태로 처리하고, 401 Unauthorized 응답을 반환
            log.info("*********** JWT token is missing");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "MISSING_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter writer = response.getWriter();
            writer.println(msg);
            writer.close();
        }
    }
}
