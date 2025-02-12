package com.ieum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class UserInterestDTO {
    private Long userInterestId;
    private Long interestId;
    private String userName;
    private String iconName;
    private String iconPath;


}
