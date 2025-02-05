package com.ieum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ieum.domain.Msg;
import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import com.ieum.dto.MsgDTO;
import com.ieum.dto.ChatRoom;
import com.ieum.repository.ChatRepository;
import com.ieum.util.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@CrossOrigin(origins = "http://localhost:5173")
public class ChatService {

    private final ChatRepository chatRepository;
    ObjectMapper objectMapper = new ObjectMapper();

    private final MsgService msgService;
    public List<Room> findAll() {
        return chatRepository.findAll();
    }

    public Room findRoomById(Long roomId) {
        return chatRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found: " + roomId));
    }

    public ChatRoom findChatRoomById(Long roomId) {
        Room room = findRoomById(roomId);
        return convertToChatRoom(room);
    }


    public void handleAction(Long roomId, WebSocketSession session, MsgDTO MsgDTO)  {
        log.info("handle action START");
        ChatRoom chatRoom = findChatRoomById(roomId);

        // 사용자가 채팅방에 입장할 때

        if (isEnterRoom(MsgDTO)) {
            chatRoom.join(roomId, session);  // 세션을 채팅방에 추가
            MsgDTO.setCONTENT("채팅방이 개설되었습니다.");  // 입장 메시지 설정
            
        } else {
            // 다른 메시지 처리 로직
        }

        // 메시지 객체 생성
        TextMessage textMessage = Util.Chat.resolveTextMessage(MsgDTO);
        log.info("textMessage########## : {}", textMessage.getPayload());

        // 메시지 전송
        chatRoom.sendMessage(roomId, session, textMessage);  // 세션을 포함하여 메시지를 전송

        MsgDTO chatMsg = null;
        try {
            chatMsg =objectMapper.readValue(textMessage.getPayload(), MsgDTO.class);
            log.info("chatMsg {}", chatMsg);
        }catch (Exception e) {}

        Msg msg = new Msg();
        msg.setROOM_ID(chatMsg.getROOM_ID());
        msg.setCONTENT(chatMsg.getCONTENT());
        msg.setUSERNAME("junwooTest@nate.com");
        msg.setMY_EMO_ID(1L);
        msg.setREG_DATE(chatMsg.getReg_date());


        log.info("msg123 : {}",msg);
        msgService.save(msg);
    }

    private boolean isEnterRoom(MsgDTO MsgDTO) {
        log.info("MsgDTO.getMessageType() {}", MsgDTO.getMessageType());
        List<Msg> is_first = msgService.getMsgs(MsgDTO.getROOM_ID());

        return is_first.isEmpty();
    }

    private ChatRoom convertToChatRoom(Room room) {
        return ChatRoom.of(room.getROOM_ID(), room.getNAME());
    }
}
