package com.ieum.config;
import com.ieum.dto.MsgDTO;
import com.ieum.service.ChatService;
import com.ieum.util.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final ChatService chatService;

    // roomId를 키로 세션을 관리
    private final Map<Long, Set<WebSocketSession>> roomSessions = new HashMap<>();

    //연결초기관리
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//
//        log.info("New session connected: {}", session.getId());
//
//    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        String payload = message.getPayload();
        log.info("받은 메시지!!!: {}", payload);

        MsgDTO msgDTO = Util.Chat.resolvePayload(payload);
        Long roomId = msgDTO.getROOM_ID();  // 메시지에서 roomId를 추출

        // 세션에 roomID 저장 속성
        session.getAttributes().put("roomId", roomId);

        // DB저장 및 해당 채팅방 세션에 메시지 보내깅
        chatService.handleAction(roomId, session, msgDTO);

        // roomId에 속한 세션들에만 메시지 보내깅
        roomSessions.computeIfAbsent(roomId, k -> new CopyOnWriteArraySet<>()).add(session);

        Set<WebSocketSession> sessionsInRoom = roomSessions.get(roomId);
        //브로드캐스팅
        if (sessionsInRoom != null) {
            for (WebSocketSession webSocketSession : sessionsInRoom) {
                if (webSocketSession.isOpen() ) {
                    try {
                        webSocketSession.sendMessage(new TextMessage(payload));  // 해당 채팅방에만 메시지 전송
                    } catch (Exception e) {
                        log.error("Error sending message to session: {}", webSocketSession.getId(), e);
                    }
                }
            }
        }
    }

//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        Long roomId = (Long) session.getAttributes().get("roomId");
//
//        // 해당 roomId에 해당하는 세션 목록에서 세션 제거
//        Set<WebSocketSession> sessionsInRoom = roomSessions.get(roomId);
//        if (sessionsInRoom != null) {
//            sessionsInRoom.remove(session);
//            if (sessionsInRoom.isEmpty()) {
//                roomSessions.remove(roomId);  // 해당 roomId의 세션 목록이 비었으면 roomSessions에서 제거
//            }
//        }
//
//        log.info("Session disconnected from room {}: {}", roomId, session.getId());
//    }
}
