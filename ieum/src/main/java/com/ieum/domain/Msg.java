package com.ieum.domain;

import jakarta.persistence.Entity;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Msg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MSG_ID;
    private Long ROOM_ID;
    private String USERNAME;
    private String CONTENT;
    private String KO;
    private String EN;
    private String JA;
    private String CH;

    @Enumerated(EnumType.STRING)
    private MsgStatus STATUS;

    private String REG_DATE;


}
