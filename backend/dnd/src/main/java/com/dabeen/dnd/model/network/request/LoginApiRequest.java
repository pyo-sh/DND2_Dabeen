// LoginApiRequest.java
// login위해 request를 통해 전달받을 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginApiRequest{
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String id;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String pwd;
}