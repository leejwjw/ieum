//package com.ieum.repository;
//
//
//import com.ieum.domain.User;
//import com.ieum.domain.UserStatus;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//
//import java.util.List;
//import java.util.Optional;
//
//@SpringBootTest
//
//@Slf4j
//
//public class UserRepositoryTests {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Test
//    public void testFindAll() {
//        // UserRepository에서 모든 User 데이터를 조회
//        List<User> result = userRepository.findAll();
//        // 결과 출력
//        if (!result.isEmpty()) {
//            log.info("----회원리스트----: {}", result);
//        } else {
//            log.info("----찾을 수 없음----");
//        }
//    }
//    @Test
//    public void testFindById() {
//        Long id = 5L;
//        Optional<User> user = userRepository.findById(id);
//        if (!user.isEmpty()) {
//            log.info("----특정 회원----: {}", user);
//        } else {
//            log.info("----찾을 수 없음----");
//        }
//    }
//    @Test
//
//    public void testSave() {
//        User user = User.builder()
//                .USERNAME("junwooTest@nate.com")
//                .PASSWORD("111")
//                .NICK_NAME("준테스트2")
//                .IS_PUBLIC(false)
//                .STATUS(UserStatus.ACTIVE)
//                .build();
//        userRepository.save(user);
//    }
//}
