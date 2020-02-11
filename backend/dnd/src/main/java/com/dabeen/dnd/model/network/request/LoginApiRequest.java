// LoginApiRequest.java
// login위해 request를 통해 전달받을 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginApiRequest{
    private String id;
    private String pwd;
}