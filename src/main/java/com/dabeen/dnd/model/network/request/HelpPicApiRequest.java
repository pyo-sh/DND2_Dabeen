// HelpPicApiRequest.java
// HelpPic엔터티의 request에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.request;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpPicApiRequest{
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String helpNum;

    private Integer picOrnu;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String path;
}