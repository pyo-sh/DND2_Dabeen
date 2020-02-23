// MsgApiRequest.java
// Msg엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MsgApiRequest{
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String chatNum;

    @NotNull(message = "값이 존재해야 합니다.")
    private String msgWriterNum;

    private LocalDateTime msgSendDttm;

    @NotNull(message = "값이 존재해야 합니다.")
    private String cont;

}