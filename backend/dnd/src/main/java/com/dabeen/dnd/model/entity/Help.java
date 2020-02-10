// Help.java
// Help 엔터티
// 작성자 : 권영인


package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.dabeen.dnd.model.enumclass.Whether;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
public class Help{

    @Id
    @NotEmpty(message = " is not null")
    private String helpNum; // 도움번호

    @NotEmpty(message = " is not null")
    private LocalDateTime helpPstnDttm; // 도움게시일시

    //FK로써 추후 만들어지는 엔터티로 종속성 연결 필요
    @NotEmpty(message = " is not null")
    private String catNum; // 카테고리번호

    //FK로써 추후 만들어지는 엔터티로 종속성 연결 필요
    @NotEmpty(message = " is not null")
    private String cnsrNum; // 수요자번호

    @NotEmpty(message = " is not null")
    private String title; // 제목

    @NotEmpty(message = " is not null")
    private String execLoc; // 이행위치

    @NotEmpty(message = " is not null")
    @Min(value = 0, message = "price must be at least 0.")
    private BigDecimal price; // 금액

    @NotEmpty(message = " is not null")
    @Min(value = 1, message = "prefSupplNum must be higher than 1.")
    private Integer prefSupplNum; // 희망공급자수

    @NotEmpty(message = " is not null")
    private LocalDateTime prefHelpExecDttm; // 희망도움이행일시

    @NotEmpty(message = " is not null")
    private LocalDateTime helpAplyClsDttm; // 도움신청마감일시

    @NotEmpty(message = " is not null")
    private String cont; // 내용

    @NotEmpty(message = " is not null")
    private Whether helpAprvWhet; // 도움승인여부

    @NotEmpty(message = " is not null")
    private String execSggName; //이행시군구명
    
}