package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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
    private String USERNAME;
    private String NICK_NAME;
    private String KEYWORD;
    private String NATION_NAME;
    private Boolean IS_PUBLIC;
    private Boolean IS_USER;
    private String PHOTO_PATH;
    @Builder.Default
    private LocalDateTime REG_DATE = LocalDateTime.now();
    @Enumerated(EnumType.STRING)
    private UserStatus STATUS;

}
