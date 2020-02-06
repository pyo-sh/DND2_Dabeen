package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Pymt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PymtRepository extends JpaRepository<Pymt, String>{
    
}