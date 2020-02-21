// Pymt.java
// 결제 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.PymtMthdType;
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
@Entity
@Builder
@Accessors(chain = true)
@ToString(exclude = {"mileageUseHist", "bskt"})
public class Pymt{
    @Id
    @Column(name = "pymt_num")
    private String pymtNum; // 결제번호
    
    private LocalDateTime pymtDttm; // 결제일시

    private PymtMthdType pymtMthdType; // 결제방법구분

    private BigDecimal pymtPrice; // 결제 금액

    @Enumerated(EnumType.STRING)
    private Whether refdWhet; // 환불여부

    private LocalDateTime refdDttm; // 환불 일시


    /* 연관관계 설정 */
    @OneToOne(mappedBy = "pymt")
    private MileageUseHist mileageUseHist;

    @MapsId // (name)은 복합키일 때만
    @JoinColumn(name = "pymt_num")
    @OneToOne
    private Bskt bskt; // 결제와 식별관계
}