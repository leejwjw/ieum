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
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ROOM_ID;

    private Long RC_ID;
    private String NAME;
    private String CONTENT;
    @Enumerated(EnumType.STRING)
    private RoomType TYPE;
    private Long ROOM_LIMIT;
    private String LAT;
    private String LNG;
    private LocalDateTime REG_DATE;
    private String KEYWORD;

}
