package com.ieum.repository;

import com.ieum.domain.Room;
import com.ieum.domain.RoomType;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class RoomRepositoryTests {

    @Autowired
    private RoomRepository roomRepository;

    @Test
    public void testFindAll() {
        // RoomRepository에서 모든 Room 데이터를 조회
        List<Room> result = roomRepository.findAll();
        // 결과 출력
        if (!result.isEmpty()) {
            log.info("----방 리스트----: {}", result);
        } else {
            log.info("----찾을 수 없음----");
        }
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            log.info("----특정 방----: {}", room.get());
        } else {
            log.info("----찾을 수 없음----");
        }
    }

    @Test
    public void testSave() {
        Room room = Room.builder()
                .NAME("테스트 방")
                .CONTENT("CONTENT !!")
                .TYPE(RoomType.PRIVATE)
                .LIMIT(10L)
                .LAT("37.5665")
                .LNG("126.9780")
                .KEYWORD("테스트")
                .REG_DATE(LocalDateTime.now())
                .build();

        roomRepository.save(room);
        log.info("----저장된 방----: {}", room);
    }
}
