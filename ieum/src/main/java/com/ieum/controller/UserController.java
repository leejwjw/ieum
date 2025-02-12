package com.ieum.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ieum.domain.Nation;
import com.ieum.domain.UserInterest;
import com.ieum.dto.ModifyDTO;
import com.ieum.dto.MyInfoDTO;
import com.ieum.dto.UserDTO;
import com.ieum.service.UserService;
import com.ieum.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final FileUtil fileUtil;


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
        for (UserInterest userInterest : userService.getMyInterests(username)) {
            log.info(userInterest.getInterest().toString());
        }

        return userService.getMyInterests(username);
    }

    @PutMapping("/{username}/modify")
    public ResponseEntity<?> modifyUser(
            @PathVariable String username,
            @RequestPart(value = "file", required = false) MultipartFile file, // 파일은 optional
            @RequestPart("data") String data) { // JSON 데이터를 ModifyDTO로 매핑
        try {
            // JSON 데이터 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            ModifyDTO modifyDTO = objectMapper.readValue(data, ModifyDTO.class);

            // 서비스 계층에서 파일과 데이터를 처리
            userService.modifyUser(file, modifyDTO);
            return ResponseEntity.ok("사용자 정보 수정 성공");
        } catch (Exception e) {
            // 에러 메시지 포함 반환
            return ResponseEntity.badRequest().body("업데이트 실패: " + e.getMessage());
        }
    }

    @GetMapping("/{username}/getUserInfo")
    public UserDTO getUserInfo(@PathVariable String username) {
        UserDTO userDTO = userService.getUsername(username);
        return userDTO;
    }

    @GetMapping("/view/{potoPath}")
    public ResponseEntity<Resource> getFilename(@PathVariable String potoPath) {
        log.info("potoPath: {}", potoPath);
        return userService.getFile(potoPath);
    }
}