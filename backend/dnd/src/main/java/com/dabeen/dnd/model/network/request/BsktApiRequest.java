// BsktApiRequest.java
// Bskt 엔터티의 request에서 전달될 데이터
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
public class BsktApiRequest{
    private String bsktNum; // 장바구니 번호
    private String bsktUserNum; // 장바구니 사용자 번호
    private BigDecimal totalPrice; // 합계금액
    private Whether mileageUseWhet; // 마일리지 사용 여부
}