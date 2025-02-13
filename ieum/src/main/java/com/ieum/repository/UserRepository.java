package com.ieum.repository;

import com.ieum.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u JOIN u.INTEREST ui WHERE ui.interest.interestId = :interestId")
    List<User> getUsersByInterestId(@Param("interestId") Long interestId);
    @Query("SELECT u FROM User u " +
            "JOIN UserInterest ui ON u.username = ui.user.username " +
            "WHERE u.username LIKE %:searchTerm% " +
            "OR u.NICK_NAME LIKE %:searchTerm% " +
            "OR ui.iconName LIKE %:searchTerm% " +
            "OR u.INTRO LIKE %:searchTerm%")
    List<User> findUsersBySearchTerm(@Param("searchTerm") String searchTerm);




}
