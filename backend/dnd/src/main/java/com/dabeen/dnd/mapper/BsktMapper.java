package com.dabeen.dnd.mapper;

import com.dabeen.dnd.model.entity.Bskt;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BsktMapper{
    // 2개 이상의 객체를 파라미터로 넘기기 위해서
    void insert(Bskt bskt);
}