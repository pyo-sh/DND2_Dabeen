// SupplierApiRequest.java
// 공급자 신청을 위한 request
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierApiRequest{
    @NotEmpty(message = "값이 존재해야 합니다.")
    private String userNum;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String picPath;

    @NotEmpty(message = "값이 존재해야 합니다.")
    private String rrnPath;
}