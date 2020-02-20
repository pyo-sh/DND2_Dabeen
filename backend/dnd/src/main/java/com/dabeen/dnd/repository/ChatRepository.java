// ChatRepository.java
// Chat의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 권영인

package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,String>{

}