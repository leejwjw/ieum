package com.ieum.service;

import com.ieum.domain.Msg;
import com.ieum.domain.Participants;
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

    public Room createRoom(String user1, String user2) {
// 1. 방 생성
        Room room = new Room();
        room.setROOM_LIMIT(2L);
        room.setNAME("대화방");
        room = roomRepository.save(room);  // 방 저장

        // 2. 두 사용자 방에 참가시킴
        Participants participant1 = new Participants();
        participant1.setROOM_ID(room.getROOM_ID());
        participant1.setUSERNAME(user1);
        participantRepository.save(participant1);

        Participants participant2 = new Participants();
        participant2.setROOM_ID(room.getROOM_ID());
        participant2.setUSERNAME(user2);
        participantRepository.save(participant2);

        return room;  // 생성된 방 반환
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

