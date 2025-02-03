package com.ieum.controller;

import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import com.ieum.dto.MsgDTO;
import com.ieum.dto.ChatRoom;
import com.ieum.repository.ChatRepository;
import com.ieum.service.ChatService;
import com.ieum.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;


@RestController("/chat/room")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.154:5173"})  // 여러 출처 설정
public class ChatController {
    private final ChatRepository chatRepository;
    private final ChatService chatService;
    public List<Room> findAll() {
        return chatRepository.findAll();
    }

    public Room findRoomById(Long roomId) {
        return chatRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found: " + roomId));
    }


}