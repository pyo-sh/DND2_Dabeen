// PostApiResponse.java
// Post 엔터티의 Response에 대한 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.response;

import java.time.LocalDateTime;

import com.dabeen.dnd.model.enumclass.PostType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostApiResponse {
    private String postNum; // 게시글 번호
    private String pstnerNum; // 작성자 번호
    private LocalDateTime pstnDttm; //게시글 작성 일시
    private PostType postType; // 게시글 구분
    private String title; // 제목
    private String cont;
    private String questPostNum; // 질문 게시글 번호
    private PostApiResponse rplyPost; // 답변
}