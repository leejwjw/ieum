package com.ieum.repository;

import com.ieum.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r" +
            " LEFT JOIN Msg m ON r.ROOM_ID = m.ROOM_ID" +
            " WHERE r.TYPE = 'OPEN'" +
            " GROUP BY r.ROOM_ID " +
            "ORDER BY COUNT(m) DESC")
    List<Room> findOpenRoomAll();

    @Query("SELECT r FROM Room r " +
            "WHERE r.ROOM_ID " +
            "IN (SELECT p.ROOM_ID FROM Participants p WHERE p.USERNAME = :userName)")
    List<Room> getRoomsByUserName(@Param("userName") String userName);



}
