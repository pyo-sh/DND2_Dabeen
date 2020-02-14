// FindApiRequest.java
// 비밀번호 찾기, 아이디 찾기에 대한 request 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import lombok.Data;

@Data
public class FindApiRequest{
    private String id;
    private String name;
    private String email;
}