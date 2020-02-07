// Pymt.java
// 결제 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.PymtMthdType;
import com.dabeen.dnd.model.enumclass.Whether;

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
public class Pymt{
    @Id
    @NotEmpty(message = " is not null")
    private String pymtNum; // 결제번호
    
    @NotNull(message = " is not null")
    private LocalDateTime pymtDttm; // 결제일시

    @NotEmpty(message = " is not null")
    @Enumerated(EnumType.STRING)
    private PymtMthdType pymtMthdType; // 결제방법구분

    @NotNull(message = " is not null")
    @Min(value = 0, message =  " must be at least 0.")
    private BigDecimal pymtPrice; // 결제 금액

    @Enumerated(EnumType.STRING)
    private Whether refdWhet; // 환불여부

    private LocalDateTime refdDttm; // 환불 일시
}