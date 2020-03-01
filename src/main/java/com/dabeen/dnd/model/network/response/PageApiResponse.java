// PageApiResponse.java
// 페이지 처리되는 api들에서 페이지 정보를 돌려주기 위한 response
// 작성자 : 이은비
package com.dabeen.dnd.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageApiResponse {
    private Integer totalDatas; // 총 데이터 수
    private Integer totalPages; // 총 페이지 수
    private Integer dataPerPage; // 페이지 별 데이터 수

    public PageApiResponse(Integer totalDatas, Integer dataPerPage){
        this.totalDatas = totalDatas;
        this.totalPages = (int)Math.ceil((double)totalDatas / dataPerPage);
        this.dataPerPage = dataPerPage;
    }
}