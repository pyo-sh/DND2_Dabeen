// BsktRepository.java
// BSkt의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 후에 개발을 위해 미리 작성합니다.
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.Bskt;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BsktRepository extends JpaRepository<Bskt, String>{
    
}