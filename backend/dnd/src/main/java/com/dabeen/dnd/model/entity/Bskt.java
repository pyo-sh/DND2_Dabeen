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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
    @NotEmpty(message = "is not Empty")
    private String bsktNum; // 장바구니 번호

    @NotEmpty(message = "is not Empty")
    private String bsktUserNum; // 장바구니 사용자 번호

    @NotNull(message = "is not null.")
    @Min(value = 0, message = "must be at least 0.")
    private BigDecimal totalPrice; // 합계 금액

    @NotNull(message = "is not null.")
    @Enumerated(EnumType.STRING)
    private Whether mileageUseWhet; // 마일리지 사용 여부
}