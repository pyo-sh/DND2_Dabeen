package com.dabeen.dnd.model.network.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FqaApiResponse{

    private String fqaNum; // 자주묻는질문번호

    private LocalDateTime questPstnDttm; // 질문게시일시

    private String title; // 제목

    private String rplyCont; // 답변내용

    private String fqaRgistrantNum; // 자주묻는질문등록자번호


}