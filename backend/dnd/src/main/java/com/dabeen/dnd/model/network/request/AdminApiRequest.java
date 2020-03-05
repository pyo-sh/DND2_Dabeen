// AdminApiRequest.java
// admin 엔터티의 request에 해당되는 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminApiRequest{
    private String adminNum; // 관리자 번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String adminName; // 관리자 이름

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String address; // 관리자 주소

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String phoneNum; // 관리자 전화번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String adminId; // 아이디

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String pwd; // 비밀번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    @Email(message = "형식이 잘못되었습니다.")
    private String email; // 이메일
}
