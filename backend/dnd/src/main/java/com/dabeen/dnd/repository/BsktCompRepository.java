package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.BsktComp;
import com.dabeen.dnd.model.pk.BsktCompPK;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BsktCompRepository extends JpaRepository<BsktComp,BsktCompPK>{
    
}