// UserMapper.java
// 식별자를 일련번호롤 생성하기 위한 쿼리문을 매핑하기 위한 인터페이스
// 작성자 : 이은비

package com.dabeen.dnd.repository.mapper;

import java.util.List;

import com.dabeen.dnd.model.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper{
    void insert(User user);

    List<User> selectFiveOderByRate(String blonSggName);
}