// Post.java
// 게시글 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import com.dabeen.dnd.model.enumclass.PostType;

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
public class Post{
    @Id
    @NotEmpty(message = "is not null")
    private String postNum; // 게시글 번호

    @NotEmpty(message = "is not null")
    @Enumerated(EnumType.STRING)
    private PostType postType; // 게시글 구분
 
    @NotEmpty(message = "is not null")
    private String title; // 제목
 
    @NotEmpty(message = "is not null")
    private String cont; // 내용
    
    private LocalDateTime questPstnDttm; // 질문게시일시

    private String questerNum; // 답변게시일시

    private LocalDateTime rplyPstnDttm; // 답변게시일시

    private String rplyerNum; // 답변자 번호

    private String questPostNum; // 질문 게시글 번호
}