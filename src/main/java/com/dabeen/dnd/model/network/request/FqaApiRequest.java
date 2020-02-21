// FqaApiRequest.java
// Fqa엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FqaApiRequest{

    private String fqaNum; // 자주묻는질문번호

    @NotNull(message = "값이 존재해야 합니다.")
    private LocalDateTime questPstnDttm; // 질문게시일시

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String title; // 제목

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String rplyCont; // 답변내용

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String fqaRgistrantNum; // 자주묻는질문등록자번호


}