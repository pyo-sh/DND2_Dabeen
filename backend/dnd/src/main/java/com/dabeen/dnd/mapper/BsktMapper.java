// BsktMapper.java
// 식별자를 일련번호롤 생성하기 위한 쿼리문을 매핑하기 위한 인터페이스
// 작성자 : 이은비
package com.dabeen.dnd.mapper;

import com.dabeen.dnd.model.entity.Bskt;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BsktMapper{
    // 2개 이상의 객체를 파라미터로 넘기기 위해서
    void insert(Bskt bskt);
}