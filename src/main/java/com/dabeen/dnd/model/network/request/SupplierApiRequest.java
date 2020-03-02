// SupplierApiRequest.java
// 공급자 신청을 위한 request
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierApiRequest{
    private String userNum;
    private String picPath;
    private String rrnPath;
}