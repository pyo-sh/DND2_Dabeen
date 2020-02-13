// HelpSupplCompApiRequestt.java
// HelpSupplComp 엔터티의 request에서 전달될 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

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
public class HelpSupplCompApiRequest {
    /* request에서는 PK를 객체 형태로 받지 않으므로 */
    private String helpNum; // 도움 번호
    private String supplNum; // 공급자 번호
    
    private Whether helpAprvWhet; // 도움승인여부
    private LocalDateTime aprvDttm; // 승인일시
    private LocalDateTime astDttm; // 평가일시
    private BigDecimal rate; // 평점
    private String astCont; // 평가내용
}