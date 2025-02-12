package com.ieum.dto;

import com.ieum.domain.UserInterest;
import com.ieum.domain.UserStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Getter
@Setter
@NoArgsConstructor // 기본 생성자 추가
public class UserDTO {
    private String USERNAME;
    private String NICK_NAME;
    private String KEYWORD;
    private String NATION_NAME;
    private String ADDRESS;
    private String LANG;
    private String INTRO;
    private boolean IS_PUBLIC;
    private boolean IS_USER;
    private String PHOTO_PATH;
    private LocalDateTime REG_DATE; // 자동으로 현재 시간 할당
    private String STATUS;
    private List<Long> INTEREST;

    public UserDTO(String USERNAME, String NICK_NAME, String KEYWORD, String NATION_NAME, String ADDRESS, String LANG, String INTRO, boolean IS_PUBLIC, boolean IS_USER, String PHOTO_PATH, LocalDateTime REG_DATE, String STATUS, List<Long> INTEREST) {
        this.USERNAME = USERNAME;
        this.NICK_NAME = NICK_NAME;
        this.KEYWORD = KEYWORD;
        this.NATION_NAME = NATION_NAME;
        this.ADDRESS = ADDRESS;
        this.LANG = LANG;
        this.INTRO = INTRO;
        this.IS_PUBLIC = IS_PUBLIC;
        this.IS_USER = IS_USER;
        this.PHOTO_PATH = PHOTO_PATH;
        this.REG_DATE = REG_DATE;
        this.STATUS = STATUS;
        this.INTEREST = INTEREST;
    }

    public UserDTO(String username, String nickname, String keyword, String nation, String lang, Boolean isPublic, Boolean isUser, String photoPath, LocalDateTime regDate, String status) {
    }




    // JWT 를 위한 메서드 : 현재 사용자 정보 Map 타입으로 리턴
    public Map<String, Object> getClaims() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", USERNAME);
        claims.put("nickname", NICK_NAME);
        claims.put("keyword", KEYWORD);
        claims.put("nation", NATION_NAME);
        claims.put("lang", LANG);
        claims.put("status", STATUS);
        claims.put("photoPath", PHOTO_PATH);
        claims.put("isPublic", IS_PUBLIC);
        claims.put("isUser", IS_USER);
        return claims;
    }
}
