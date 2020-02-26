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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help")
public class HelpApiController extends CrudController<HelpApiRequest,HelpApiResponse,Help>{
    @Autowired
    private HelpApiService helpApiService;

    @GetMapping("{userNum}/no-payment-helps")
    public Header<List<HelpAppliInfoApiResponse>> searchNoPaymentHelps(@PathVariable String userNum){
        return helpApiService.searchNoPaymentHelps(userNum);
    }
}