// Fqa.java
// Fqa 엔터티
// 작성자 : 권영인

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
public class Fqa{

    @Id
    @NotEmpty(message = " is not empty")
    private String fqaNum; // 자주묻는질문번호

    @NotNull(message = " is not null")
    private LocalDateTime questPstnDttm; // 질문게시일시

    @NotEmpty(message = " is not empty")
    private String title; // 제목

    @NotEmpty(message = " is not empty")
    private String rplyCont; // 답변내용

    //Default CRUD 생성 후 종속성 연결 작업 필요
    @NotEmpty(message = " is not empty")
    private String fqaRgistrantNum; // 자주묻는질문등록자번호

}