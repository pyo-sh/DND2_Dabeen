// HelpSupplCompRepository.java
// HelpSupplComp의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import java.util.List;

import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpSupplCompRepository extends JpaRepository<HelpSupplComp, HelpSupplCompPK>{
    List<HelpSupplComp> findByHelpSupplCompPK_helpNum(String helpNum);
    List<HelpSupplComp> findByHelpSupplCompPK_SupplNumAndHelpAprvWhet(String userNum, Whether whet);
}