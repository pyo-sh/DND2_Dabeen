package com.dabeen.dnd.model.network.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatApiResponse{

    private String chatNum;

    private LocalDateTime chatGenDttm;
    
    private LocalDateTime chatEndDttm;

    private String helpNum;

    private String cnsrNum;

    private String supplNum;
}