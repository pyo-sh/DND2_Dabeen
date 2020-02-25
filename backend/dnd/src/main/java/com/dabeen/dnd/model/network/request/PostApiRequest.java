// PostApiRequest.java
// Post 엔터티의 Request에 대한 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.PostType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostApiRequest{
    private String postNum; // 게시글 번호

    private String pstnerNum; // 작성자 번호

    private LocalDateTime pstnDttm; //게시글 작성 일시

    @NotNull(message = "값이 존재해야 합니다.")
    private PostType postType; // 게시글 구분

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String title; // 제목

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String cont;

    private String questPostNum; // 질문 게시글 번호
}