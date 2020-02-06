package com.dabeen.dnd.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

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
    @NotEmpty(message = " is not null")
    private String adminNum; // 관리자 번호

    @NotEmpty(message = " is not null")
    private String adminName; // 관리자 이름

    @NotEmpty(message = " is not null")
    private String address; // 관리자 주소

    @NotEmpty(message = " is not null")
    private String phoneNum; // 관리자 전화번호

    @NotEmpty(message = " is not null")
    private String id; // 아이디

    @NotEmpty(message = " is not null")
    private String pwd; // 비밀번호

    @NotEmpty(message = " is not null")
    @Email(message = " is not formatted")
    private String email; // 이메일
}