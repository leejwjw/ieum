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
    private String USERNAME;
    private String NICK_NAME;
    private String PASSWORD;
    private String NATION_NAME;

    @Enumerated(EnumType.STRING)
    private UserStatus STATUS;

    private boolean IS_PUBLIC;
    private String PHOTO;
    private String KEYWORD;

    @Builder.Default
    private LocalDateTime REG_DATE = LocalDateTime.now();

}
