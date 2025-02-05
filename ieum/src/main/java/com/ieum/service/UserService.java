package com.ieum.service;

import com.ieum.domain.Nation;
import com.ieum.domain.Room;
import com.ieum.repository.NationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final NationRepository nationRepository;

    public List<Nation> getAllNations() {
        return nationRepository.findAll();
    }
}
