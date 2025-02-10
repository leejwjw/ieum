package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {

    @Id
    private String username;
    private String NICK_NAME;
    private String KEYWORD;
    private String NATION_NAME;
    private String ADDRESS;
    private String LANG;
    private Boolean IS_PUBLIC;
    private Boolean IS_USER;
    private String PHOTO_PATH;
    private String INTRO;
    @Builder.Default
    private LocalDateTime REG_DATE = LocalDateTime.now();
    @Enumerated(EnumType.STRING)
    private UserStatus STATUS;

    // UserInterest와의 관계 설정
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserInterest> INTEREST = new ArrayList<>();

}
