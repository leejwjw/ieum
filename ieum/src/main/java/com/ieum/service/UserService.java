package com.ieum.service;

import com.ieum.domain.Interest;
import com.ieum.domain.Nation;
import com.ieum.domain.User;
import com.ieum.domain.UserInterest;
import com.ieum.dto.ModifyDTO;
import com.ieum.dto.MyInfoDTO;
import com.ieum.dto.UserDTO;
import com.ieum.repository.InterestRepository;
import com.ieum.repository.NationRepository;
import com.ieum.repository.UserInterestRepository;
import com.ieum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/upload";
    private final NationRepository nationRepository;
    private final UserRepository userRepository;
    private final UserInterestRepository userInterestRepository;
    private final InterestRepository interestRepository;
    private final KakaoAuthService kakaoAuthService;

    @Value("${ieum.upload.path}")
    private String uploadPath;

    public List<Nation> getAllNations() {
        return nationRepository.findAll();
    }

    public UserDTO getUsername(String username) {
        log.info("username: {}", username);
        Optional<User> findMember = userRepository.findById(username);
        User user = findMember.orElseThrow(() -> new RuntimeException("User not found"));
        UserDTO userDTO = kakaoAuthService.entityToDTO(user);
        return userDTO;
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

        // (필요에 따라 기존의 UserInterest 삭제 처리 가능) 하지만 처음 등록이기에 삭제할게 없다 판단.
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

    public List<UserInterest> getMyInterests(String userName) {
        return userInterestRepository.getMyInterests(userName);
    }

    @Transactional
    public void modifyUser(MultipartFile file, ModifyDTO modifyDTO) {
        // username은 ModifyDTO에 포함되어 있음.
        String username = modifyDTO.getUserName();
        // 1. username으로 사용자 조회
        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. username: " + username));

        // 2. 파일 업로드 처리 (파일이 존재하면)
        if (file != null && !file.isEmpty()) {
            String encryptedFilename = saveEncryptedFile(file);
            user.setPHOTO_PATH(encryptedFilename);
        }

        // 3. ModifyDTO의 나머지 데이터로 User 업데이트
        user.setIS_PUBLIC(modifyDTO.getIsPublic());
        user.setNATION_NAME(modifyDTO.getNationName());
        user.setLANG(modifyDTO.getLang());
        user.setADDRESS(modifyDTO.getAddress());
        user.setNICK_NAME(modifyDTO.getNickname());
        user.setINTRO(modifyDTO.getIntro());
        user.setKEYWORD(modifyDTO.getKeyword());
        // 관심사(쉼표로 구분된 문자열)는 User 엔티티에도 저장할 수 있음 (필요에 따라)

        // 4. 기존 관심사가 있으면 삭제 (처음 등록이므로 삭제해도 문제 없음)
        userInterestRepository.deleteByUser(user);

        // 5. 전달받은 interest 문자열을 쉼표로 분리하여 각각 새로운 UserInterest 등록
        String[] interestIdArray = modifyDTO.getInterest().split(",");
        for (String interestIdStr : interestIdArray) {
            Long interestId = Long.parseLong(interestIdStr.trim());

            // 5-1. Interest 테이블에서 해당 interestId가 존재하는지 확인
            Optional<Interest> interestOpt = interestRepository.findById(interestId);
            if (!interestOpt.isPresent()) {
                throw new RuntimeException("해당 관심사가 존재하지 않습니다. interestId: " + interestId);
            }
            Interest interest = interestOpt.get();

            // 5-2. 새 UserInterest 엔티티 생성 및 저장
            UserInterest userInterest = new UserInterest();
            userInterest.setUser(user);
            userInterest.setInterest(interest);
            userInterest.setIconName(interest.getName());
            userInterest.setIconPath(interest.getIcon());

            userInterestRepository.save(userInterest);
        }

        userRepository.save(user);
    }
    public List<UserDTO> getUserByInterest(Long userInterestId) {
        List<User> users = userRepository.getUsersByInterestId(userInterestId);

        return users.stream().map(user -> new UserDTO(
                user.getUsername(),
                user.getNICK_NAME(),
                user.getKEYWORD(),
                user.getNATION_NAME(),
                user.getADDRESS(),
                user.getLANG(),
                user.getINTRO(),
                user.getIS_PUBLIC(),
                user.getIS_USER(),
                user.getPHOTO_PATH(),
                user.getREG_DATE(),
                user.getSTATUS().name(),
                user.getINTEREST().stream().map(interest -> interest.getInterest().getInterestId()).collect(Collectors.toList())
        )).collect(Collectors.toList());
    }
    public List<UserDTO> getUsersBySearchTerm(String searchTerm) {
        List<User> users = userRepository.findUsersBySearchTerm(searchTerm);

        // User 리스트를 UserDTO 리스트로 변환
        return users.stream()
                .map(user -> new UserDTO(
                        user.getUsername(),
                        user.getNICK_NAME(),
                        user.getKEYWORD(),
                        user.getNATION_NAME(),
                        user.getADDRESS(),
                        user.getLANG(),
                        user.getINTRO(),
                        user.getIS_PUBLIC(),
                        user.getIS_USER(),
                        user.getPHOTO_PATH(),
                        user.getREG_DATE(),
                        user.getSTATUS().name(),
                        null // INTEREST 필드가 필요 없다면 null로 전달
                ))
                .collect(Collectors.toList());
    }

    private String saveEncryptedFile(MultipartFile file) {
        try {
            // 업로드 디렉토리가 없으면 생성
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            // 암호화: UUID를 생성하여 사용
            String encryptedFilename = generateEncryptedFilename(originalFilename) + fileExtension;

            // 파일 저장
            Path filePath = Paths.get(UPLOAD_DIR, encryptedFilename);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            return encryptedFilename;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 중 오류 발생", e);
        }
    }

    private String generateEncryptedFilename(String originalFilename) {
        // 간단하게 UUID를 사용하여 고유한 파일 이름 생성
        return UUID.randomUUID().toString();
    }



    // 파일 정보 리턴 -> 이미지 브라우저에 보여주기 위한 파일리소스 get메서드
    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
        if(!resource.isReadable()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.jpg");
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }
}

