// PymtExecutionApiRequest.java
// 결제 생성을 위한 Request
// 작성자 : 이은비

package com.dabeen.dnd.model.network.request;

import java.util.List;

import com.dabeen.dnd.model.enumclass.PymtMthdType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PymtExecutionApiRequest{
    private String userNum;
    private PymtMthdType pymtMthdType;
    private List<String> helpNums;
}