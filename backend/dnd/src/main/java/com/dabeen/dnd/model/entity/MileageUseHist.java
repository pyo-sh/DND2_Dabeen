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
    private MileageUseHistPK mileageUseHistPK; // 복합 PK, userNum/MileageUseDttm
    
    @Enumerated(EnumType.STRING)
    private MileageUseType useType; // 사용구분

    @Min(value = 0, message = "UsePrice must be at least 0.")
    private BigDecimal usePrice; // 사용 금액

    private String bsktNum; // 장바구니 번호

    private String wdrlAcctNum; // 인출계좌 번호

    private String pymtNum; // 결제번호
}