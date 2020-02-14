// HelpApiResponse.java
// Help엔터티의 response에서 전달받을 데이터
// 작성자 : 권영인

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
public class HelpApiResponse{

    private String helpNum;

    private LocalDateTime helpPstnDttm;

    private String catNum;

    private String cnsrNum;

    private String title;

    private String execLoc;

    private BigDecimal price;

    private Integer prefSupplNum;

    private LocalDateTime prefHelpExecDttm;

    private LocalDateTime helpAplyClsDttm;

    private String cont;

    private Whether helpAprvWhet;

    private String execSggName;
}