// HelpPicMapper.java
// 순번 증가를 쿼리문으로 매핑하기 위한 인터페이스
// 작성자 : 권영인

package com.dabeen.dnd.repository.mapper;

import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.pk.HelpPicPK;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

//DB 복구후 MapperXML 작성 예정

@Mapper
public interface HelpPicMapper{
    void insert(@Param("helpNum") String helpNum, @Param("path") String path);
}