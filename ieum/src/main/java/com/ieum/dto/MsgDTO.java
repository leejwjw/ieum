package com.ieum.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;


import java.time.LocalDateTime;
import java.util.Map;

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
    private String USERNAME;
    private String CONTENT;
    private String KO;
    private String EN;
    private String JA;
    private String CH;
    private Status STATUS;
    private String selectedLanguage;
    private Map<String, String> translatedMessage;

    private String reg_date;

    private MessageType messageType;

}