// UserApiRequest.java
// User엔터티의 request에서 전달받을 데이터
// 작성자 : 이은비
package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserApiRequset {
    // requset에서 전달될 데이터
    private String userNum; // 사용자 번호
    private String userName; // 사용자 이름
    private String birthDate; // 생일 
    private String address; // 주소
    private String phoneNum; // 휴대폰 번호
    private String id; // 아이디
    private String pwd; // 비밀번호
    private String email; // 이메일
    private String nickname; // 닉네임
    private String itdcCont; // 소개 내용
    private Whether supplWhet; // 공급자 여부
    private String blonSggName; // 소속시군구명
    private String picPath; // 사진 경로명
    private String rrnRear; // 주민번호 뒷자리
    private BigDecimal avgRate; // 평점
    private BigDecimal ownMilege; // 보유 마일리지
}