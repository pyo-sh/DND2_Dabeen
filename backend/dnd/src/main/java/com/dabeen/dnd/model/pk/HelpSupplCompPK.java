// HelpSupplCompPk.java
// HelpSupplComp 엔터티의 복합키를 구현하기 위한 클래스
// 작성자 : 이은비
package com.dabeen.dnd.model.pk;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class HelpSupplCompPK implements Serializable{ 
    // PK 객체의 변수들을 DB의 해당 속성에 정상적으로 저장하기 위해 직렬화!
    private static final long serialVersionUID = 1L; // 기본 값
    
    @Column(name = "help_num")
    private String helpNum; // 도움 번호

    @Column(name = "suppl_num")
    private String supplNum; // 공급자 번호
}