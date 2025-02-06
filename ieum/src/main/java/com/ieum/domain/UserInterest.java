package com.ieum.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInterest {
    @Id
    private String USERNAME;
    @ElementCollection
    @CollectionTable(name = "USER_INTEREST", joinColumns = @JoinColumn(name = "USERNAME"))
    @Column(name = "USER_INTEREST")
    private List<String> INTEREST; // 관심사를 배열로 처리
}
