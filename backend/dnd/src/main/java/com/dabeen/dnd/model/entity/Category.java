// Category.java
// Category 엔터티
// 작성자 : 권영인

package com.dabeen.dnd.model.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.GeneratorType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
@ToString(exclude={"helps"})
public class Category{

    @Id
    @NotEmpty(message = "is not empty")
    private String catNum; // 카테고리번호

    @NotEmpty(message = "is not empty")
    private String catName; // 카테고리명

    @NotEmpty(message = "is not empty")
    private String catDesc; // 카테고리설명

    //FK로서 Category로 종속성 대칭 필요
    private String highCatNum; //상위카테고리번호

    // @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    // private List<Help> helps;

}