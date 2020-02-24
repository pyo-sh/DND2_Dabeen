// UserApiRequest.java
// User엔터티의 request에서 전달받을 데이터
// 작성자 : 이은비
package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.dabeen.dnd.model.enumclass.Whether;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonDeserialize
public class UserApiRequest {
    // requset에서 전달될 데이터
    private String userNum; // 사용자 번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userName; // 사용자 이름

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String birthDate; // 생일 

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String address; // 주소

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String phoneNum; // 휴대폰 번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userId; // 아이디

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String pwd; // 비밀번호

    @NotEmpty(message = "값이 존재해야 합니다.")
    @Email(message = "형식이 잘못되었습니다.")
    private String email; // 이메일

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String nickname; // 닉네임

    private String itdcCont; // 소개 내용

    private Whether supplWhet; // 공급자 여부
    
    private String picPath; // 사진 경로명
    
    private String rrnRear; // 주민번호 뒷자리
    
    @Min(value = 0, message = "값이 0에서 5사이의 값이어야 합니다.")
    @Max(value = 5, message = "값이 0에서 5사이의 값이어야 합니다.")
    private BigDecimal avgRate; // 평점
    
    @Min(value = 0, message = "값이 0 이상이어야 합니다.")
    private BigDecimal ownMileage; // 보유 마일리지
}