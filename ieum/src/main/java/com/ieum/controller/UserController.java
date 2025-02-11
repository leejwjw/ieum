package com.ieum.controller;

import com.ieum.domain.Nation;
import com.ieum.domain.User;
import com.ieum.domain.UserInterest;
import com.ieum.dto.MyInfoDTO;
import com.ieum.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/user")
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



    @PostMapping("/{username}/myinfo")
    public ResponseEntity<String> saveUser(@PathVariable String username, @RequestBody MyInfoDTO myInfoDTO) {
        try {
            userService.saveMyInfo(myInfoDTO);
            return ResponseEntity.ok("사용자 정보 및 관심사가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("업데이트 실패: " + e.getMessage());
        }
    }


    @GetMapping("/interest/{username}")
    public List<UserInterest> getMyInterest (@PathVariable String username) {
        log.info("관심사 수 : {}",userService.getMyInterests(username).size());
//        for (UserInterest userInterest : userService.getMyInterests(username)) {
//            log.info(userInterest.getInterest().toString());
//        }
        return userService.getMyInterests(username);
    }
}
