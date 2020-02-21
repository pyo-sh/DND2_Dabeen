// BsktCompApiRequest.java
// BsktComp엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BsktCompApiRequest{
    @NotNull(message = "값이 존재해야 합니다.")
    private String bsktNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private String helpNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private String supplNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private BigDecimal indvHelpPrice;
}