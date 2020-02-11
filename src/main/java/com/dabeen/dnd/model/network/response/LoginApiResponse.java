// LoginApiResponse.java
// login위해 response를 통해 전달할 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginApiResponse{
    private String token;
}