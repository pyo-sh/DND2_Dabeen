// Bskt.java
// 장바구니 엔터티에 대한 클래스
// 작성자 : 이은비
package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.Min;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Accessors(chain = true)
public class Bskt{
    @Id
    private String bsktNum; // 장바구니 번호

    private String bsktUserNum; // 장바구니 사용자 번호

    @Min(value = 0, message = "TotalPrice must be at least 0.")
    private BigDecimal totalPrice; // 합계 금액

    @Enumerated(EnumType.STRING)
    private Whether mileageUseWhet; // 마일리지 사용 여부
}