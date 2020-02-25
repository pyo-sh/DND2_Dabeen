// Post.java
// 게시글 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.dabeen.dnd.model.enumclass.PostType;

import org.hibernate.annotations.JoinColumnOrFormula;
import org.hibernate.annotations.JoinColumnsOrFormulas;

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

    private LocalDateTime pstnDttm; //게시글 작성 일시

    @Enumerated(EnumType.STRING)
    private PostType postType; // 게시글 구분
 
    private String title; // 제목

    private String cont; // 내용

    /* 연관관계 설정 */
    @ManyToOne
    @JoinColumn(name = "pstner_num", insertable=false, updatable=false)
     // 중복 매핑이므로. mybatis를 이용하여 insert 하기때문에 문제 없음
    private User quester;

    @ManyToOne
    @JoinColumn(name = "pstner_num", insertable=false, updatable=false)
    private Admin rplyer;

    @OneToOne
    @JoinColumn(name = "quest_post_num")
    private Post questPost;
    
    @OneToOne(mappedBy = "questPost")
    private Post rplyPost;
}