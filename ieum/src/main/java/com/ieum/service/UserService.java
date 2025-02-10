package com.ieum.service;

import com.ieum.domain.Interest;
import com.ieum.domain.Nation;
import com.ieum.domain.User;
import com.ieum.domain.UserInterest;
import com.ieum.dto.MyInfoDTO;
import com.ieum.repository.InterestRepository;
import com.ieum.repository.NationRepository;
import com.ieum.repository.UserInterestRepository;
import com.ieum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final NationRepository nationRepository;
    private final UserRepository userRepository;
    private final UserInterestRepository userInterestRepository;
    private final InterestRepository interestRepository;

    public List<Nation> getAllNations() {
        return nationRepository.findAll();
    }

    @Transactional
    public void saveMyInfo(MyInfoDTO myInfoDTO) throws Exception {
        // 1. username으로 사용자 조회 (User 테이블의 기본키는 username)
        Optional<User> userOpt = userRepository.findById(myInfoDTO.getUSERNAME());
        if (!userOpt.isPresent()) {
            throw new RuntimeException("사용자를 찾을 수 없습니다. username: " + myInfoDTO.getUSERNAME());
        }
        User user = userOpt.get();

        // 2. User 엔티티 업데이트
        user.setNATION_NAME(myInfoDTO.getNATION_NAME());
        user.setLANG(myInfoDTO.getLANG());
        user.setADDRESS(myInfoDTO.getADDRESS());
        user.setINTRO(myInfoDTO.getINTRO());
        user.setKEYWORD(myInfoDTO.getKEYWORD());
        userRepository.save(user);

        // (필요에 따라 기존의 UserInterest 삭제 처리 가능)
        // 예: userInterestRepository.deleteByUser(user);

        // 3. 전달받은 interest String을 쉼표로 분리하여 처리 ("1,2,3" → {"1", "2", "3"})
        String[] interestIdArray = myInfoDTO.getINTEREST().split(",");
        for (String interestIdStr : interestIdArray) {
            Long interestId = Long.parseLong(interestIdStr.trim());

            // 4. 해당 interestId가 Interest 테이블에 존재하는지 확인
            Optional<Interest> interestOpt = interestRepository.findById(interestId);
            if (!interestOpt.isPresent()) {
                throw new RuntimeException("해당 관심사가 존재하지 않습니다. interestId: " + interestId);
            }
            Interest interest = interestOpt.get();

            // 5. 동일 사용자가 이미 해당 관심사를 가지고 있다면(중복 등록 방지)
            Optional<UserInterest> existing = userInterestRepository
                    .findByUser_UsernameAndInterest_InterestId(user.getUsername(), interestId);
            if (existing.isPresent()) {
                continue; // 이미 등록된 관심사는 건너뛰기
            }

            // // 6. 새로운 UserInterest 생성 및 저장 (각 관심사가 별도의 row로 저장됨)
            UserInterest userInterest = new UserInterest();
            userInterest.setUser(user);
            userInterest.setInterest(interest);
            // icon 정보는 Interest 엔티티에서 가져오도록 설정 (필요시)
            userInterest.setIconName(interest.getName());
            userInterest.setIconPath(interest.getIcon());

            userInterestRepository.save(userInterest);
        }
    }
}
