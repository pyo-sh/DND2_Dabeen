// HelpApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import java.util.List;
import java.util.Map;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpAppliInfoApiResponse;
import com.dabeen.dnd.service.api.HelpApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help")
public class HelpApiController extends CrudController<HelpApiRequest,HelpApiResponse,Help>{
    @Autowired
    private HelpApiService helpApiService;

    // 미결제 도움 APi
    @GetMapping("{userNum}/no-payment-helps")
    public Header<List<HelpAppliInfoApiResponse>> searchNoPaymentHelps(@PathVariable String userNum){
        return helpApiService.searchNoPaymentHelps(userNum);
    }

    // 받을 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 미래인 것
    @GetMapping("{userNum}/to-receive-helps")
    public Header<Map<String, Object>> searchToReceiveHelps(@PathVariable String userNum, @PageableDefault(size = 15) Pageable pageable){
        return helpApiService.searchToReceiveHelps(userNum, pageable);
    }

    // 받은 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 과거인 것
    @GetMapping("{userNum}/received-helps")
    public Header<Map<String, Object>> searchReceivedHelps(@PathVariable String userNum, @PageableDefault(size = 15) Pageable pageable){
        return helpApiService.searchReceivedHelps(userNum, pageable);
    }
}