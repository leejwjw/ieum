package com.ieum.repository;

import com.ieum.domain.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {
    Optional<UserInterest> findByUser_UsernameAndInterest_InterestId(String username, Long interestId);}
