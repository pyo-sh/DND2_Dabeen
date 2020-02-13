// PostType.java
// 게시글 구분을 위한 enumclass
// 작성자 : 이은비

package com.dabeen.dnd.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PostType{
    q(0, "QUESTIONS", "질문 게시글"),
    a(1, "ANSWER", "답변 게시글");

    private Integer id;
    private String title;
    private String description;
}