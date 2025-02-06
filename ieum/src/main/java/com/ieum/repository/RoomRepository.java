package com.ieum.repository;

import com.ieum.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r" +
            " LEFT JOIN Msg m ON r.ROOM_ID = m.ROOM_ID" +
            " WHERE r.TYPE = 'OPEN'" +
            " GROUP BY r.ROOM_ID " +
            "ORDER BY COUNT(m) DESC")

    List<Room> findOpenRoomAll();
}
