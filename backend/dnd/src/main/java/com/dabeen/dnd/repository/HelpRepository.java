// HelpRepository.java
// Help의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 권영인

package com.dabeen.dnd.repository;

import java.math.BigDecimal;
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

    // 도움조회화면 검색 조건들에 따라 결과를 출력하기 위한 Query Method
    @Query(value = "select * from help where help_end_dttm = :helpEndDttm AND (title LIKE CONCAT('%',:title,'%') OR cont LIKE CONCAT('%',:title,'%')) AND exec_loc LIKE CONCAT('%',:execLoc,'%') AND help_aply_cls_dttm BETWEEN :helpAplyClsDttmBegin AND :helpAplyClsDttmEnd AND pref_help_exec_dttm BETWEEN :prefHelpExecDttmBegin AND :prefHelpExecDttmEnd AND price BETWEEN :priceBegin AND :priceEnd ORDER BY help_num DESC  ",nativeQuery = true)
    Page<Help> findByMultipleVariableSearchHelp(@Param("title") String title, @Param("helpEndDttm") LocalDateTime helpEndDttm ,@Param("execLoc") String execLoc, @Param("helpAplyClsDttmBegin") LocalDateTime helpAplyClsDttmBegin, @Param("helpAplyClsDttmEnd") LocalDateTime helpAplyClsDttmEnd, @Param("prefHelpExecDttmBegin") LocalDateTime prefHelpExecDttmBegin, @Param("prefHelpExecDttmEnd") LocalDateTime prefHelpExecDttmEnd, @Param("priceBegin") BigDecimal priceBegin, @Param("priceEnd") BigDecimal priceEnd, Pageable pageable);

    // Page<Help> findByTitleContainingOrContContainingAndExecLocContainingAndHelpAplyClsDttmBetweenAndPrefHelpExecDttmBetweenAndPriceBetween(@Param("title") String title, @Param("cont") String cont, @Param("execLoc") String execLoc, @Param("helpAplyClsDttmBegin") LocalDateTime helpAplyClsDttmBegin, @Param("helpAplyClsDttmEnd") LocalDateTime helpAplyClsDttmEnd, @Param("prefHelpExecDttmBegin") LocalDateTime prefHelpExecDttmBegin, @Param("prefHelpExecDttmEnd") LocalDateTime prefHelpExecDttmEnd, @Param("priceBegin") BigDecimal priceBegin, @Param("priceEnd") BigDecimal priceEnd, Pageable pageable);

}

