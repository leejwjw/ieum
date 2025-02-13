package com.ieum.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class UserInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_interest_id")
    private Long userInterestId;

    @Column(name ="icon_name")
    private String iconName;


    @Column(name = "icon_path")
    private String iconPath;

    // User와 연관 관계 설정 (username으로 Join됨)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", referencedColumnName = "USERNAME")
    private User user; // 'user' 필드와 'USERNAME' 컬럼 연관

    // Interest 엔티티와의 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_id", referencedColumnName = "INTEREST_ID")
    private Interest interest;
}
