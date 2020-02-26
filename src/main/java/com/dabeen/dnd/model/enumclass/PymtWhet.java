package com.dabeen.dnd.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PymtWhet{

    n(0, "NON-PAYMENT", "미결제 상태"),
    p(1, "PAYMENT", "결제 상태"),
    r(2, "REFUND",  "환불 상태");

    private Integer id;
    private String title;
    private String description;
}