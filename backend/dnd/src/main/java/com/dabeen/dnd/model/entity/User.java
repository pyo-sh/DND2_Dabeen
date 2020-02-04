// User.java
// User 엔터티
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.dabeen.dnd.model.enumclass.Whether;

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
public class User{
    // 기본 식별자
    @Id
    private String userNum; // 사용자 번호

    private String userName; // 사용자 이름

    private String birthDate; // 생일

    private String address; // 주소

    private String phoneNum; //휴대폰 번호

    private String id; // 아이디

    private String pwd; // 비밀번호

    private String email; // 이메일

    private String nickname; // 닉네임

    private String itdcCont; // 소개내용

    // 여부에 해당되는 값을 지정하기 위해 enumclass로 처리
    @Enumerated(EnumType.STRING)
    private Whether supplWhet; // 공급자 여부

    private String blonSggName; // 소속시군구명

    private String picPath; // 사진경로명

    @Min(value = 0, message = "AvgRate must be a value between 0 and 5, inclusive.")
    @Max(value = 5, message = "AvgRate must be a value between 0 and 5, inclusive.")
    private BigDecimal avgRate; // 평점

    @Min(value = 0, message = "OwnMileage must be at least 0.")
    private BigDecimal ownMilege; // 보유 마일리지
}