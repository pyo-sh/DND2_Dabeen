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
public class MsgApiRequest{

    private String chatNum;

    private String msgWriterNum;

    private LocalDateTime msgSendDttm;

    private String cont;

}