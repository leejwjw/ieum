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
public class User {
    @Id
    private String USERNAME;
    private String NICKNAME;
    private String NATION_NAME;
    private String STATUS;
    private String PHOTO_PATH;
    private String KEYWORD;
    private String IS_PUBLIC;

    @Builder.Default
    private LocalDateTime REG_DATE = LocalDateTime.now(); // 자동으로 현재 시간 할당

}
