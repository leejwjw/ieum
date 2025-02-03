package com.ieum.dto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


public class UserDTO {
    private String USERNAME;
    private String NICKNAME;
    private String NATION_NAME;
    private String STATUS;
    private String PHOTO_PATH;
    private String KEYWORD;
    private boolean IS_PUBLIC;
    private LocalDateTime REG_DATE; // 자동으로 현재 시간 할당

    public UserDTO(String USERNAME, String NICKNAME, String NATION_NAME, String STATUS, String PHOTO_PATH, String KEYWORD, boolean IS_PUBLIC, LocalDateTime REG_DATE) {
        this.USERNAME = USERNAME;
        this.NICKNAME = NICKNAME;
        this.NATION_NAME = NATION_NAME;
        this.STATUS = STATUS;
        this.PHOTO_PATH = PHOTO_PATH;
        this.KEYWORD = KEYWORD;
        this.IS_PUBLIC = IS_PUBLIC;
        this.REG_DATE = REG_DATE;
    }

    public UserDTO(String USERNAME, String NICKNAME, String KEYWORD, String NATION_NAME, boolean IS_PUBLIC, String PHOTO_PATH, LocalDateTime REG_DATE, String STATUS) {
    }

    // JWT 를 위한 메서드 : 현재 사용자 정보 Map 타입으로 리턴
    public Map<String, Object> getClaims() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", USERNAME);
        claims.put("status", STATUS);
        return claims;
    }
}
