package com.ieum.controller;




import com.ieum.domain.Msg;
import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import com.ieum.dto.RoomDTO;
import com.ieum.service.MsgService;
import com.ieum.service.RoomService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import static com.ieum.domain.RoomType.OPEN;
import static com.ieum.domain.RoomType.PRIVATE;

@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.154:5173"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/room")

public class RoomController {
    private final RoomService roomService;
    private final MsgService msgService;

    @GetMapping("/list/{userName}")
    public List<Room> list(@PathVariable("userName") String userName) {
        log.info("list^^^^^^^^^^  :{}", roomService.getMyRooms(userName));
        return roomService.getMyRooms(userName);
    }
    @GetMapping("/listDetail/{userName}")
    public List<RoomDTO> listDetail(@PathVariable("userName") String userName) {
        return roomService.getRoomDetailsByUserName(userName);
    }


    @GetMapping("/msgs/{room_ID}")
    public List<Msg> getMsgs(@PathVariable("room_ID") Long roomId, HttpServletRequest request) {

        return msgService.getMsgs(roomId);
    }
    @PostMapping("/create")
    public Room createRoom(@RequestBody Map<String, String> body) {
        String user1 = body.get("user1");
        String user2 = body.get("user2");
        log.info("user1 : {}", user1);
        log.info("user2 : {}", user2);

        // 방 생성 로직
        Room room = roomService.createRoom(user1, user2);

        return room;
    }


}
