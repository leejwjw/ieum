package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class UserInterest {
    @Id
    private String USER_INTEREST_ID;

    @ElementCollection
    @CollectionTable(name = "INTEREST_ID", joinColumns = @JoinColumn(name = "USERNAME"))
    @Column(name = "INTEREST_ID")
    private List<String> INTEREST; // 관심사를 배열로 처리
}
