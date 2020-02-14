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