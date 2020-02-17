package com.dabeen.dnd.model.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Accessors(chain = true)
@ToString(exclude = {"replies"})
public class Admin{
    @Id
    @NotEmpty(message = "is not null")
    private String adminNum; // 관리자 번호

    @NotEmpty(message = "is not null")
    private String adminName; // 관리자 이름

    @NotEmpty(message = "is not null")
    private String address; // 관리자 주소

    @NotEmpty(message = "is not null")
    private String phoneNum; // 관리자 전화번호

    @Column(name = "id") // 레파지토리를 이용하여 find하기 위해서 속성 이름 변경
    @NotEmpty(message = "is not null")
    private String adminId; // 아이디

    @NotEmpty(message = "is not null")
    private String pwd; // 비밀번호

    @NotEmpty(message = "is not null")
    @Email(message = "is not formatted")
    private String email; // 이메일


    /* 연관관계 설정 */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rplyer")
    private List<Post> replies;
}