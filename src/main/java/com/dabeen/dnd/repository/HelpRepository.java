// HelpRepository.java
// Help의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 권영인

package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Help;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRepository extends JpaRepository<Help, String>{

}