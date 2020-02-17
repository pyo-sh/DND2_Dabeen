// HelpPic.java
// HelpPic 엔터티
// 작성자 : 권영인


package com.dabeen.dnd.model.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.pk.HelpPicPK;

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
@Table(name = "help_pic")
public class HelpPic{

    // //FK로써 추후 Help로 종속성 대칭 필요
    @EmbeddedId
    @NotNull(message = "is not null")
    private HelpPicPK helpPicPK;

    @NotEmpty(message = "is not empty")
    private String path; // 경로명

}