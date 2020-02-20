// CategoryApiResponse.java
// Category엔터티의 response에서 전달받을 데이터
// 작성자 : 권영인

package com.dabeen.dnd.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryApiResponse{

    private String catNum;

    private String catName;

    private String catDesc;

    private String highCatNum;

}