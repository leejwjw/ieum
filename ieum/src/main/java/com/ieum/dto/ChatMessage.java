package com.ieum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {


    public enum MessageType {
        ENTER, TALK
    }
    private Long roomId;
    private MessageType messageType;
    private String sender;
    private String message;
    private String reg_date;
}
