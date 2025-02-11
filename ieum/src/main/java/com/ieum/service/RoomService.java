package com.ieum.service;

import com.ieum.domain.Msg;
import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import com.ieum.dto.MsgDTO;
import com.ieum.dto.RoomDTO;
import com.ieum.repository.MsgRepository;
import com.ieum.repository.ParticipantRepository;
import com.ieum.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@CrossOrigin(origins = "http://localhost:5173")
public class RoomService {

    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final MsgRepository msgRepository;

    public Room createRoom(Room room) {

        return roomRepository.save(room);
    }
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getMyRooms(String userName) {
        return  roomRepository.getRoomsByUserName(userName);
    }
    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElse(null);
    }
    public List<RoomDTO> getRoomDetailsByUserName(String userName) {
        List<Object[]> results = participantRepository.getRoomIdAndPhotoPathByUserName(userName);
        return results.stream().map(result -> {
            Long roomId = (Long) result[0]; // 첫 번째 요소는 ROOM_ID
            String photoPath = (String) result[1]; // 두 번째 요소는 photo_path

            return new RoomDTO(
                    roomId,
                    photoPath
            );
        }).collect(Collectors.toList());
    }
}
