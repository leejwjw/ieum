package com.ieum.controller;

import com.ieum.domain.Nation;
import com.ieum.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
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

//    @PostMapping("user/interest")
//    public ResponseEntity<?> saveUserInterests(@RequestBody UserInterestDTO request) {
//        userInterestService.saveUserInterests(request);
//        return ResponseEntity.ok("User interests saved successfully.");
//    }

//    @PutMapping("/{username}/myInfo")
//    public Nation get(@PathVariable String username, UserDTO userDTO) {
//        log.info("get **** : {}", username);
//        log.info("get **** : {}", userDTO);
//
//        userDTO.setUSERNAME(username);
//        userDTO oldUserDTO = userService.getUser(username); // DB에 저장된 기존 회원 정보 조회
//    }
}
