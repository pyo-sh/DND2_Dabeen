package com.dabeen.dnd.repository;

import java.time.LocalDateTime;

import com.dabeen.dnd.model.entity.Bskt;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BsktMapper{
    void insert(Bskt bskt, LocalDateTime sysdate);
}