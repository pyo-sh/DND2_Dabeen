package com.dabeen.dnd.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
public class Chat{

    // Default CRUD 작업 후 종속성 작업 필요
    @Id
    @NotEmpty(message = "is not empty")
    private String chatNum; // 채팅번호

    @NotNull(message = "is not null")
    private LocalDateTime chatGenDttm; // 채팅생성일시 

    @NotNull(message = "is not null")
    private LocalDateTime chatEndDttm; // 채팅종료일시

    @NotEmpty(message = "is not empty")
    private String helpNum; // 도움번호

    @NotEmpty(message = "is not empty")
    private String cnsrNum; // 수요자번호

    @NotEmpty(message = "is not empty")
    private String supplNum; // 공급자번호

}