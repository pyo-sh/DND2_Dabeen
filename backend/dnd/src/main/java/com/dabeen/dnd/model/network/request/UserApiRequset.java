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
    private String userNum;
    private String userName;
    private String birthDate;
    private String address;
    private String phoneNum;
    private String id;
    private String pwd;
    private String email;
    private String nickname;
    private String itdcCont;
    private Whether supplWhet;
    private String blonSggName;    
    private String picPath;
    private BigDecimal avgRate;
    private BigDecimal ownMilege;
}