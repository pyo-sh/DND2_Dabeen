package com.dabeen.dnd.repository.mapper;

import com.dabeen.dnd.model.entity.Help;

import org.apache.ibatis.annotations.Mapper;

// HelpMapper.java
// 식별자를 일련번호롤 생성하기 위한 쿼리문을 매핑하기 위한 인터페이스
// 작성자 : 권영인

@Mapper
public interface HelpMapper{
    void insert(Help help);
}
