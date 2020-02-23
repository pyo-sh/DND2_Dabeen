// Post.java
// 게시글 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.PostType;

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
@ToString(exclude = {"quester", "rplyer", "questPost", "rplyPost"})
public class Post{
    @Id
    private String postNum; // 게시글 번호

    @Enumerated(EnumType.STRING)
    private PostType postType; // 게시글 구분
 
    private String title; // 제목

    private String cont; // 내용
    
    private LocalDateTime questPstnDttm; // 질문게시일시

    private LocalDateTime rplyPstnDttm; // 답변게시일시


    /* 연관관계 설정 */
    @ManyToOne
    @JoinColumn(name = "quester_num")
    private User quester;

    @ManyToOne
    @JoinColumn(name = "rplyer_num")
    private Admin rplyer;

    @OneToOne
    @JoinColumn(name = "quest_post_num")
    private Post questPost;
    
    @OneToOne(mappedBy = "questPost")
    private Post rplyPost;
}