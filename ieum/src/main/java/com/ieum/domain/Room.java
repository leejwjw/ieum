package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Room {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ROOM_ID;

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
