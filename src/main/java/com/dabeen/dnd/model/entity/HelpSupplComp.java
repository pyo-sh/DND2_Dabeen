// HelpSupplComp.java
// 도움공급자구성 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;

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
public class HelpSupplComp{
    @EmbeddedId
    private HelpSupplCompPK helpSupplCompPK; // 복합키를 구현하기 위한 PK 객체

    // 여부에 해당되는 값을 지정하기 위해 enumclass로 처리
    @Enumerated(EnumType.STRING)
    private Whether helpAprvWhet; // 도움승인여부

    private LocalDateTime aprvDttm; // 승인일시

    private LocalDateTime astDttm; // 평가일시

    @Min(value = 0, message = "Rate must be a value between 0 and 5, inclusive.")
    @Max(value = 5, message = "Rate must be a value between 0 and 5, inclusive.")
    private BigDecimal rate; // 평점

    private String astCont; // 평가내용
}
