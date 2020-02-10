package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<String,Category>{
    
}