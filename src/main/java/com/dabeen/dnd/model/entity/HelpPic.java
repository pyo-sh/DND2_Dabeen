package com.dabeen.dnd.model.entity;

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
public class HelpPic{

    //FK로써 추후 Help로 종속성 대칭 필요
    @Id
    @NotEmpty(message = " is not empty")
    private String helpNum; // 도움번호

    @Id
    @NotNull(message = " is not null")
    private Integer picOrnu; // 사진순번

    @NotEmpty(message = " is not empty")
    private String path; // 경로명

}