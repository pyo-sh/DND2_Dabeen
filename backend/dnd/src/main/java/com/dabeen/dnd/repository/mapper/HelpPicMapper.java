// HelpPicMapper.java
// 순번 증가를 쿼리문으로 매핑하기 위한 인터페이스
// 작성자 : 권영인

package com.dabeen.dnd.repository.mapper;

import java.util.Map;

import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.pk.HelpPicPK;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface HelpPicMapper{
    // void insert(@Param("helpNum") String helpNum, @Param("path") String path);
    void insert(Map<String,Object> helpPicMapper);
}