// MileageUseHistPk.java
// MileageUseHist 엔터티의 복합키를 구현하기 위한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.pk;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class MileageUseHistPK implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userNum; // 사용자 번호
    private LocalDateTime mileageUseDttm; // 마일리지 사용 일시
}