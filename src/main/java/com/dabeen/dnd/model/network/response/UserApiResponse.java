// UserAPiResponse.java
// User 엔터티의 Response에서 전달될 데이터 
// 보안을 위해 pwd 제외
// 작성자 : 이은비

package com.dabeen.dnd.model.network.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserApiResponse{
    // response에서 전달될 데이터
    private String userNum;
    private String userName;
    private LocalDate birthDate;
    private String address;
    private String phoneNum;
    private String id;
    private String email;
    private String nickName;
    private Whether supplWhet;
    private String blonSggName;    
    private String picPath;
    private BigDecimal avgRate;
    private BigDecimal ownMilege;
}