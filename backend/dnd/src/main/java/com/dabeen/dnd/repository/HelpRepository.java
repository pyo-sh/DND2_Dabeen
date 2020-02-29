// HelpRepository.java
// Help의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 권영인

package com.dabeen.dnd.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.enumclass.PymtWhet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRepository extends JpaRepository<Help, String>{
    List<Help> findByUser_UserNumAndPymtWhet(String userNum, PymtWhet whet);
    Page<Help> findByUser_UserNumAndPrefHelpExecDttmAfter(String userNum, LocalDateTime dateTime, Pageable pageable);
    Page<Help> findByUser_UserNumAndPrefHelpExecDttmBefore(String userNum, LocalDateTime dateTime, Pageable pageable);
    List<Help> findByPrefHelpExecDttm(LocalDateTime prefHelpExecDttm);
    List<Help> findTop9ByCategory_CatNumAndHelpEndDttmAndExecLocContainingOrderByHelpNumDesc(String catNum, LocalDateTime endDttm ,String execLoc);
    List<Help> findTop9ByCategory_CatNumAndHelpEndDttmOrderByHelpNumDesc(String catNum, LocalDateTime endDttm);
}

