// UserRepository.java
// User의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import com.dabeen.dnd.model.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
}