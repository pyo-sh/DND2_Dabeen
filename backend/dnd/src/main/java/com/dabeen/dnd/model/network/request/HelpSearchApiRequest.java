package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpSearchApiRequest{

    private String title;

    private String location;

    private LocalDateTime helpAplyEndDttm;

    private LocalDateTime helpExecDttm;

    private BigDecimal priceBegin; 

    private BigDecimal priceEnd;

}