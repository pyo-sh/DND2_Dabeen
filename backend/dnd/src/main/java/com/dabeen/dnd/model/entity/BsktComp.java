package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.pk.BsktCompPK;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Accessors(chain = true)
public class BsktComp {

    //Default CRUD 생성 후 종속성 설정 필요
    // @Id
    // @NotEmpty(message = " is not empty")
    // private String bsktNum; // 장바구니번호

    // //Default CRUD 생성 후 종속성 설정 필요
    // @Id
    // @NotEmpty(message = " is not empty")
    // private String helpNum; // 도움번호

    // //Default CRUD 생성 후 종속성 설정 필요
    // @Id
    // @NotEmpty(message = " is not empty")
    // private String supplNum; // 공급자번호

    @EmbeddedId
    @NotNull(message = "is not null")
    private BsktCompPK bsktCompPK;


    @NotNull(message = "is not null")
    private BigDecimal indvHelpPrice; // 개별도움가격

}