// PymtApiRequest.java
// Pymt 엔터티의 request에서 전달되는 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String pymtNum; // 결제번호

    private LocalDateTime pymtDttm; // 결제일시
    
    @NotNull(message = "값이 존재해야 합니다.")
    private PymtMthdType pymtMthdType; // 결제방법구분
    
    @Min(value = 0, message =  "값이 0 이상이어야 합니다.")
    private BigDecimal pymtPrice; // 결제금액

    private Whether refdWhet; // 환불여부

    private LocalDateTime refdDttm; // 환불일시
}