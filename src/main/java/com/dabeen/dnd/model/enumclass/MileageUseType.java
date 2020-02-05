// MileageUseType.java
// mileage 엔터티의 useType에서 사용될 enumclass
// 작성자 : 이은비

package com.dabeen.dnd.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MileageUseType{
    U(0, "USE", "마일리지 사용"),
    W(1, "WITHDRAW", "마일리지 인출"),
    R(2, "REFUND",  "마일리지 환불");

    private Integer id;
    private String title;
    private String description;
}