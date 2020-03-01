// HelpApiRequest.java
// Help엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpApiRequest{

    private String helpNum;

    // private LocalDateTime helpPstnDttm;

    // private LocalDateTime helpEndDttm;
    
    private String catNum;

    private String cnsrNum;

    private String title;

    private String execLoc;

    private BigDecimal price;

    private Integer prefSupplNum;

    private LocalDateTime prefHelpExecDttm;

    private LocalDateTime helpAplyClsDttm;

    private String cont;

    private List<HelpPicApiRequest> helpPics;

    // private Whether helpAprvWhet;

    // private String execSggName;

}