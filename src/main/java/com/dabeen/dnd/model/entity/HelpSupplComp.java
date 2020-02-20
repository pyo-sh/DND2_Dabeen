// HelpSupplComp.java
// 도움공급자구성 엔터티에 대한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;

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
@ToString(exclude = {"suppler", "help","bsktComps"})
public class HelpSupplComp{
    @EmbeddedId
    @NotNull(message = "is not null")
    private HelpSupplCompPK helpSupplCompPK; // 복합키를 구현하기 위한 PK 객체

    // @NotNull(message = "is not null")
    @Enumerated(EnumType.STRING) // 여부에 해당되는 값을 지정하기 위해 enumclass로 처리
    private Whether helpAprvWhet; // 도움승인여부

    private LocalDateTime aprvDttm; // 승인일시

    private LocalDateTime astDttm; // 평가일시

    @Min(value = 0, message = "must be a value between 0 and 5, inclusive.")
    @Max(value = 5, message = "must be a value between 0 and 5, inclusive.")
    private BigDecimal rate; // 평점

    private String astCont; // 평가내용

    
    /* 연관관계 설정 */
    @NotNull(message = "is not null")
    @MapsId("helpNum") // Pk 안의 변수와 매핑됨
    @JoinColumn(name = "help_num")
    @ManyToOne
    private Help help;

    @NotNull(message = "is not null")
    @MapsId("supplNum") // Pk 안의 변수와 매핑됨
    @JoinColumn(name = "suppl_num")
    @ManyToOne
    private User suppler;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "helpSupplComp")
    private List<BsktComp> bsktComps;

    /* 디폴트 값 설정 */
    //https://dotoridev.tistory.com/6 
    @PrePersist
    public void prePersist(){
        this.helpAprvWhet = this.helpAprvWhet == null ? Whether.n : this.helpAprvWhet;
    }
}
