package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long USER_ID;

    private Long LANG_ID;
    private Long NATION_ID;
    private String NAME;
    private String EMAIL;
    private String PASSWORD;
    private boolean IS_KAKAO;

    @Enumerated(EnumType.STRING)
    private UserStatus USER_STATUS;

    private boolean IS_HIDDEN;
    private String PHOTO;
    private String KEYWORD;

    @Builder.Default
    private LocalDateTime REG_DATE = LocalDateTime.now(); // 자동으로 현재 시간 할당
}
