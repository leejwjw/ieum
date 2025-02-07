package com.ieum.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInterestDTO {
    private Long USERNAME; // 유저 ID
    private List<Long> interestIds; // 선택된 관심사 ID 리스트

}
