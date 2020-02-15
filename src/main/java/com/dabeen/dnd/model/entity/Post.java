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
@ToString(exclude = {"quester", "rplyer", "quest", "rply"})
public class Post{
    @Id
    @NotEmpty(message = "is not null")
    private String postNum; // 게시글 번호

    @NotNull(message = "is not null")
    @Enumerated(EnumType.STRING)
    private PostType postType; // 게시글 구분
 
    @NotEmpty(message = "is not null")
    private String title; // 제목
 
    @NotEmpty(message = "is not null")
    private String cont; // 내용
    
    private LocalDateTime questPstnDttm; // 질문게시일시

    private LocalDateTime rplyPstnDttm; // 답변게시일시


    /* 연관관계 설정 */
    @ManyToOne
    @JoinColumn(name = "quester_num")
    private User quester;

    @ManyToOne
    @JoinColumn(name = "rplyer_num")
    private User rplyer;

    @ManyToOne
    @JoinColumn(name = "quest_post_num")
    private Post questPost;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "questPost")
    private List<Post> rplyPost;
}