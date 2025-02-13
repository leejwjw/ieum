package com.ieum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Participants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PT_ID;
    private Long ROOM_ID;
    private String USERNAME;

    @Enumerated(EnumType.STRING)
    private ParticipantStatus STATUS;

    private LocalDateTime REG_DATE;

    private String LANG;


}
