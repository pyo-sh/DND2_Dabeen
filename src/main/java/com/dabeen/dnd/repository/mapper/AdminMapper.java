// AdminMapper.java
// 식별자를 일련번호롤 생성하기 위한 쿼리문을 매핑하기 위한 인터페이스
// 작성자 : 이은비
package com.dabeen.dnd.repository.mapper;

import com.dabeen.dnd.model.entity.Admin;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper{
    // 2개 이상의 객체를 파라미터로 넘기기 위해서
    void insert(Admin admin);
}