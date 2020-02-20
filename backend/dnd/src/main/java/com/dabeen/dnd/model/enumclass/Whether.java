// Whether.java
// ooo여부에 사용될 enumclass. Y/N
// 작성자 : 이은비

package com.dabeen.dnd.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Whether{
    y(0, "예", "해당 여부에 대해서 예"),
    n(1, "아니오", "해당 여부에 대해서 아니오");

    private Integer id;
    private String title;
    private String description;
}