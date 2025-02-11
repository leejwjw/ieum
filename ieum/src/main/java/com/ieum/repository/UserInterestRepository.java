package com.ieum.repository;

import com.ieum.domain.UserInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {
    Optional<UserInterest> findByUser_UsernameAndInterest_InterestId(String username, Long interestId);
    @Query("SELECT u FROM UserInterest u WHERE u.user.username = :username")
    List<UserInterest> getMyInterests(@Param("username") String username);
}

