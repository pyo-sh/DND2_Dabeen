// AdminRepository.java
// Admin의 테이블-엔터티 간의 상호작용을 위한 레파지토리
// 후에 개발을 위해 미리 작성합니다.
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import java.util.List;
import java.util.Optional;

import com.dabeen.dnd.model.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Optional<Admin> findByAdminId(String adminId);
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByPhoneNum(String phoneNum);
}