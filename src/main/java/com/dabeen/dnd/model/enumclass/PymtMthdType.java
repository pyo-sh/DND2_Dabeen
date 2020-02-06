// PymtMthdType.java
// ptmt 엔터티의 PymtMthdType에서 사용될 enumclass

package com.dabeen.dnd.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PymtMthdType{
    d(0, "DEPOSIT", "무통장 입금으로 결제"),
    c(1, "CARD", "카드로 결제"),
    p(2, "PHONE",  "휴대폰으로 결제"),
    m(3, "MILEAGE", "마일리지로 결제");

    private Integer id;
    private String title;
    private String description;
}