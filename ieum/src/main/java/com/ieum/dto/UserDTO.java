package com.ieum.dto;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


public class UserDTO {
    private String USERNAME;
    private String NICK_NAME;
    private String NATION_NAME;
    private String STATUS;
    private String PHOTO_PATH;
    private String KEYWORD;
    private boolean IS_PUBLIC;
    private LocalDateTime REG_DATE; // 자동으로 현재 시간 할당

    public UserDTO(String USERNAME, String NICK_NAME, String NATION_NAME, String STATUS, String PHOTO_PATH, String KEYWORD, boolean IS_PUBLIC, LocalDateTime REG_DATE) {
        this.USERNAME = USERNAME;
        this.NICK_NAME = NICK_NAME;
        this.KEYWORD = KEYWORD;
        this.NATION_NAME = NATION_NAME;
        this.STATUS = STATUS;
        this.PHOTO_PATH = PHOTO_PATH;
        this.IS_PUBLIC = IS_PUBLIC;
        this.REG_DATE = REG_DATE;
    }

    public UserDTO(String USERNAME, String NICK_NAME, String KEYWORD, String NATION_NAME, boolean IS_PUBLIC, String PHOTO_PATH, LocalDateTime REG_DATE, String STATUS) {
    }

    // JWT 를 위한 메서드 : 현재 사용자 정보 Map 타입으로 리턴
    public Map<String, Object> getClaims() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", USERNAME);
        claims.put("nickname", NICK_NAME);
        claims.put("keyword", KEYWORD);
        claims.put("nation", NATION_NAME);
        claims.put("status", STATUS);
        claims.put("photoPath", PHOTO_PATH);
        claims.put("isPublic", IS_PUBLIC);
        claims.put("regDate", REG_DATE);
        return claims;
    }
}
