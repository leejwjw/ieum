package com.ieum.controller;

import com.ieum.domain.Nation;
import com.ieum.domain.User;
import com.ieum.dto.MyInfoDTO;
import com.ieum.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/getNations")
    public List<Nation> list() {
        log.info("getNations **** : {}", userService.getAllNations());
        return userService.getAllNations();
    }

    @PostMapping("/myinfo")
    public ResponseEntity<String> saveUser( @RequestBody MyInfoDTO myInfoDTO) {
        try {
            userService.saveMyInfo(myInfoDTO);
            return ResponseEntity.ok("사용자 정보 및 관심사가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("업데이트 실패: " + e.getMessage());
        }
    }
}
