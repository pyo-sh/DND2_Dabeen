// Bskt.java
// 장바구니 엔터티에 대한 클래스
// 작성자 : 이은비
package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Accessors(chain = true)
@ToString(exclude = {"mileageUseHists", "bsktUser", "pymt"})
public class Bskt{
    @Id
    @NotEmpty(message = "is not Empty")
    private String bsktNum; // 장바구니 번호

    @NotNull(message = "is not null.")
    @Min(value = 0, message = "must be at least 0.")
    private BigDecimal totalPrice; // 합계 금액

    @NotNull(message = "is not null.")
    @Enumerated(EnumType.STRING)
    private Whether mileageUseWhet; // 마일리지 사용 여부


    /* 연관관계 설정 */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "bskt")
    private List<MileageUseHist> mileageUseHists; // 마일리지 사용이력과 양방향 연관관계

    @NotNull(message = "is not Empty")
    @ManyToOne
    @JoinColumn(name = "bskt_user_num")
    private User bsktUser; // 장바구니 사용자 번호

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "bskt")
    private Pymt pymt;
}