package com.dabeen.dnd.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Accessors(chain = true)
public class Admin{
    @Id
    private String adminNum; // 관리자 번호

    private String adminName; // 관리자 이름

    private String address; // 관리자 주소

    private String phoneNum; // 관리자 전화번호

    private String id; // 아이디

    private String pwd; // 비밀번호

    private String email; // 이메일
}