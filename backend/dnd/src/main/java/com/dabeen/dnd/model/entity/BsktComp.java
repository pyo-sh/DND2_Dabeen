// BsktComp.java
// BsktComp 엔터티
// 작성자 : 권영인
package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.pk.BsktCompPK;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Accessors(chain = true)
@ToString(exclude = {"bskt","helpSupplComp"})
public class BsktComp {

    //Default CRUD 생성 후 종속성 설정 필요
    @EmbeddedId
    @NotNull(message = "is not null")
    private BsktCompPK bsktCompPK;


    @NotNull(message = "is not null")
    private BigDecimal indvHelpPrice; // 개별도움가격

    /* 연관관계 설정 */
    @NotNull(message = "is not null")
    @MapsId("bsktNum")
    @JoinColumn(name = "bskt_num")
    @ManyToOne
    private Bskt bskt;

    // https://stackoverflow.com/questions/31385658/jpa-how-to-make-composite-foreign-key-part-of-composite-primary-key
    @NotNull(message = "is not null")
    @MapsId("helpSupplCompPK")
    @JoinColumns({
        @JoinColumn(name="helpNum", referencedColumnName = "help_num"),
        @JoinColumn(name="supplNum", referencedColumnName = "suppl_num")
    })
    @ManyToOne
    private HelpSupplComp helpSupplComp;


}