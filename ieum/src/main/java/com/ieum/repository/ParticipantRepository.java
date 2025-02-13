package com.ieum.repository;

import com.ieum.domain.Participants;
import com.ieum.domain.Room;
import com.ieum.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participants, Long> {
    @Query("SELECT p.ROOM_ID, u.PHOTO_PATH FROM Participants p " +
            "JOIN User u ON p.USERNAME = u.username " +
            "WHERE p.USERNAME = :userName")
    List<Object[]> getRoomIdAndPhotoPathByUserName(@Param("userName") String userName);
}
