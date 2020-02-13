// PymtApiRequest.java
// Pymt 엔터티의 request에서 전달되는 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.dabeen.dnd.model.enumclass.PymtMthdType;
import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PymtApiRequest{
    private String pymtNum; // 결제번호
    private LocalDateTime pymtDttm; // 결제일시
    private PymtMthdType pymtMthdType; // 결제방법구분
    private BigDecimal pymtPrice; // 결제금액
    private Whether refdWhet; // 환불여부
    private LocalDateTime refdDttm; // 환불일시
}