//package com.ieum.service;
//
//import com.ieum.domain.Interest;
//import com.ieum.domain.User;
//import com.ieum.domain.UserInterest;
//import com.ieum.dto.UserInterestDTO;
//import com.ieum.repository.InterestRepository;
//import com.ieum.repository.UserInterestRepository;
//import com.ieum.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//public class UserInterestService {
//    private final UserInterestRepository userInterestRepository;
//    private final UserRepository userRepository;
//    private final InterestRepository interestRepository;
//
//    @Transactional
//    public void saveUserInterests(UserInterestDTO userInterestDTO) {
//        User user = userRepository.findById(String.valueOf(userInterestDTO.getUSERNAME()))
//                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userInterestDTO.getUSERNAME()));
//
//        // 기존 관심사 삭제 (덮어쓰기)
//        userInterestRepository.deleteAll(userInterestRepository.findByUserName(user.getUSERNAME()));
//
//        // 새로운 관심사 저장
//        for (Long interestId : userInterestDTO.getInterestIds()) {
//            Interest interest = interestRepository.findById(interestId)
//                    .orElseThrow(() -> new IllegalArgumentException("Interest not found: " + interestId));
//
//            UserInterest userInterest = new UserInterest();
//            userInterest.setUSER_INTEREST_ID(user);
//            userInterest.setINTEREST(interest);
//            userInterestRepository.save(userInterest);
//        }
//    }
//}
