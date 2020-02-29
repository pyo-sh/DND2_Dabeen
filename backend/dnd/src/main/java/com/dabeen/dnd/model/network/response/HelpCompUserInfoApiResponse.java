// HelpCompUserInfoApiResponse.java
// 도움 공급 구성에서 유저의 정보를 respose로 주기 위한 클래스
// 작성자 : 이은비
package com.dabeen.dnd.model.network.response;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpCompUserInfoApiResponse{
    private LocalDateTime compDttm; // 구성일시
    private Whether helpAprvWhet; // 도움승인여부
    private LocalDateTime aprvDttm; // 승인일시
    private LocalDateTime astDttm; // 평가일시
    private BigDecimal rate; // 평점
    private String astCont; // 평가내용
    private UserApiResponse user; // 공급자
}