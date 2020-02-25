// BsktApiRequest.java
// Bskt 엔터티의 request에서 전달될 데이터
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.math.BigDecimal;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String bsktUserNum; // 장바구니 사용자 번호

    @Min(value = 0, message = "값이 0 이상이여야 합니다.")
    private BigDecimal totalPrice; // 합계금액

    @NotNull(message = "값이 존재해야 합니다.")
    private Whether mileageUseWhet; // 마일리지 사용 여부
}