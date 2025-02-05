package com.ieum.service;

import com.ieum.domain.Msg;
import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import com.ieum.dto.MsgDTO;
import com.ieum.repository.MsgRepository;
import com.ieum.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
@RequiredArgsConstructor
@Slf4j
@Service
@CrossOrigin(origins = "http://localhost:5173")
public class RoomService {

    private final RoomRepository roomRepository;
    private final MsgRepository msgRepository;

    public Room createRoom(Room room) {

        return roomRepository.save(room);
    }
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }
}
