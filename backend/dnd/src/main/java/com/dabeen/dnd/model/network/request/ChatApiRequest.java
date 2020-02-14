package com.dabeen.dnd.model.network.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatApiRequest{

    private String chatNum;

    private LocalDateTime chatGenDttm;
    
    private LocalDateTime chatEndDttm;

    private String helpNum;

    private String cnsrNum;

    private String supplNum;
}