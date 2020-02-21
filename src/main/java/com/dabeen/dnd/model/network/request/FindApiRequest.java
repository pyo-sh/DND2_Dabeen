// FindApiRequest.java
// 비밀번호 찾기, 아이디 찾기에 대한 request 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class FindApiRequest{
    private String id;
    private String name;
    
    @NotEmpty(message = "값이 존재해야 합니다.")
    @Email(message = "형식이 잘못되었습니다.")
    private String email;
}