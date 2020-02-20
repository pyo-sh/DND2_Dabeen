// MileageUseHist.java
// 마일리지사용이력 엔터티에 대한 크래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.MileageUseType;
import com.dabeen.dnd.model.pk.MileageUseHistPK;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Accessors(chain = true)
@ToString(exclude = {"user, bskt, pymt"})
public class MileageUseHist {
    @EmbeddedId
    @NotNull(message = "is not null")
    private MileageUseHistPK mileageUseHistPK; // 복합 PK, userNum/MileageUseDttm
    
    @NotNull(message = "is not null")
    @Enumerated(EnumType.STRING)
    private MileageUseType useType; // 사용구분

    @NotNull(message = "is not null")
    @Min(value = 0, message = "must be at least 0.")
    private BigDecimal usePrice; // 사용 금액

    private String wdrlAcctNum; // 인출계좌 번호


    /* 연관관계 설정 */
    @NotNull(message = "is not null")
    @MapsId("userNum")
    @JoinColumn(name = "user_num")
    @ManyToOne
    private User user; // 사용자, 사용자 번호로서 매핑

    @JoinColumn(name = "bskt_num")
    @ManyToOne
    private Bskt bskt; // 장바구니, 장바구니 번호로서 매핑

    @JoinColumn(name = "pymt_num")
    @OneToOne
    private Pymt pymt; // 결제, 결제번호로서 매핑
}