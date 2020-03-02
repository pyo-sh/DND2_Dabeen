// UserUpdateApiRequest.java
// User엔터티의 request에서 전달받을 데이터
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
public class UserUpdateApiRequest {
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userNum; // 사용자 번호

    private String address; // 주소

    private String phoneNum; // 휴대폰 번호

    private String pwd; // 비밀번호

    @Email(message = "형식이 잘못되었습니다.")
    private String email; // 이메일

    private String nickname; // 닉네임

    private String itdcCont; // 소개 내용

    private String picPath; // 사진 경로명
}