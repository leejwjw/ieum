package com.ieum.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;


import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MsgDTO {

    public enum MessageType {
        ENTER, TALK
    }

    public enum Status {
        READ, UNREAD
    }

    private Long MSG_ID;
    private Long ROOM_ID;
    private Long MY_EMO_ID;
    private String USERNAME;
    private String CONTENT;
    private Status STATUS;

    private String reg_date;

    private MessageType messageType;

}