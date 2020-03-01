// HelpSupplCompApiRequestt.java
// HelpSupplComp 엔터티의 request에서 전달될 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpSupplCompApiRequest {
    /* request에서는 PK를 객체 형태로 받지 않으므로 */
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String helpNum; // 도움 번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String supplNum; // 공급자 번호
    
    private LocalDateTime compDttm; // 구성일시

    private Whether helpAprvWhet; // 도움승인여부

    private LocalDateTime aprvDttm; // 승인일시
    
    private LocalDateTime astDttm; // 평가일시

    @Min(value = 0, message = "값이 0에서 5사이의 값이어야 합니다.")
    @Max(value = 5, message = "값이 0에서 5사이의 값이어야 합니다.")
    private BigDecimal rate; // 평점
    
    private String astCont; // 평가내용
}