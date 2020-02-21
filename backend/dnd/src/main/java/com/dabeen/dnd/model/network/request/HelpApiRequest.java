// HelpApiRequest.java
// Help엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    @NotNull(message = "값이 존재해야 합니다.")
    private LocalDateTime helpPstnDttm;
    
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String catNum;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String cnsrNum;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String title;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String execLoc;

    @NotNull(message = "값이 존재해야 합니다.")
    @Min(value = 0, message = "값이 0 이상이어야 합니다.")
    private BigDecimal price;

    @NotNull(message = "값이 존재해야 합니다.")
    @Min(value = 1, message = "값이 1 이상이어야 합니다.")
    private Integer prefSupplNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private LocalDateTime prefHelpExecDttm;

    @NotNull(message = "값이 존재해야 합니다.")
    private LocalDateTime helpAplyClsDttm;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String cont;

    @NotNull(message = "값이 존재해야 합니다.")
    private Whether helpAprvWhet;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String execSggName;

}