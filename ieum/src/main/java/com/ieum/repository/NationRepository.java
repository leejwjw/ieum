package com.ieum.repository;

import com.ieum.domain.Nation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NationRepository extends JpaRepository<Nation, String> {
}
