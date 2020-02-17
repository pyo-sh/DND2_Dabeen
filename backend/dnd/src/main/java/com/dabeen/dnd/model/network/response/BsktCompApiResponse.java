// BsktCompApiRequest.java
// BsktComp엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BsktCompApiResponse{
 
    private String bsktNum;

    private String helpNum;

    private String supplNum;

    private BigDecimal indvHelpPrice;

}