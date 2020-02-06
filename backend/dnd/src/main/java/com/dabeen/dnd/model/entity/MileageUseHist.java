// MileageUseHist.java
// 마일리지사용이력 엔터티에 대한 크래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.MileageUseType;
import com.dabeen.dnd.model.pk.MileageUseHistPK;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Accessors(chain = true)
public class MileageUseHist {
    @EmbeddedId
    @NotEmpty(message = " is not null")
    private MileageUseHistPK mileageUseHistPK; // 복합 PK, userNum/MileageUseDttm
    
    @NotEmpty(message = " is not null")
    @Enumerated(EnumType.STRING)
    private MileageUseType useType; // 사용구분

    @NotNull(message = " is not null")
    @Min(value = 0, message = " must be at least 0.")
    private BigDecimal usePrice; // 사용 금액

    private String bsktNum; // 장바구니 번호

    private String wdrlAcctNum; // 인출계좌 번호

    private String pymtNum; // 결제번호
}