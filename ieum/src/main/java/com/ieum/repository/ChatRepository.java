package com.ieum.repository;


import com.ieum.domain.Room;
import com.ieum.dto.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ChatRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r WHERE r.ROOM_ID = :roomId")
    ChatRoom findChatRoomById(Long roomId);

}
