package com.ieum.dto;

import lombok.Data;

@Data
public class ModifyDTO {
    private String userName;
    private String photoPath;
    private Boolean isPublic;
    private String nationName;
    private String lang;
    private String address;
    private String nickname;
    private String intro;
    private String interest;
    private String keyword;
}
