// UserHighRateInfoApiResponse.java
// 평점 높은 5명의 정보를 보내주기 위한 response
// 작성자 : 이은비
package com.dabeen.dnd.model.network.response;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserHighRateInfoApiResponse{
    private Boolean ssgUser; // 해당 소속시군구명의 사용자인지
    private List<Map<String, Object>> users; 
}