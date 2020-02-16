package com.dabeen.dnd.repository.mapper;

import com.dabeen.dnd.model.entity.Fqa;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FqaMapper{
    void insert(Fqa fqa);
}