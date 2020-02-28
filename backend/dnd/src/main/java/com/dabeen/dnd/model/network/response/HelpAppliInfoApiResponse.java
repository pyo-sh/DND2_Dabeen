// HelpAppliInfoApiResponse.java
// 도움 신청 현황에 대한 response
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
public class HelpAppliInfoApiResponse {
    private Long appliNum; // 신청 인원
    private Long aprvNum; // 승인 인원
    private HelpExecLocApiResponse help;
}