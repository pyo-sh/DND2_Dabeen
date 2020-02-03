// User.java
// User 엔터티
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

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
    private String userNum;

    private String userName;

    private String birthDate;

    private String address;

    private String phoneNum;

    private String id;

    private String pwd;

    private String email;

    private String nickname;

    private String itdcCont;

    // 여부에 해당되는 값을 지정하기 위해 enumclass로 처리
    @Enumerated(EnumType.STRING)
    private Whether supplWhet;

    private String blonSggName;    

    private String picPath;

    private BigDecimal avgRate;

    private BigDecimal ownMilege;
}