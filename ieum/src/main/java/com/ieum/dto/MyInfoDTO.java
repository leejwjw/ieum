package com.ieum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MyInfoDTO {
    @JsonProperty("userName")
    private String USERNAME;
    @JsonProperty("nationName")
    private String NATION_NAME;
    private String LANG;
    private String ADDRESS;
    private String INTRO;

    private String INTEREST;
    private String KEYWORD;
}
