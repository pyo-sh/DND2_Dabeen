// HelpSupplCompApiController.java
// interface 층에서 작동하는 HelpSupplCompApiController
// PK가 객체이므로 상속받지 않고 직접 구현
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpSupplCompApiRequest;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.service.api.HelpSupplCompApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help-suppl-comp")
public class HelpSupplCompApiController{
    @Autowired
    private HelpSupplCompApiService helpSupplCompApiService;
    
    @PostMapping("")
    public Header<HelpSupplCompApiResponse> create(Header<HelpSupplCompApiRequest> request) {
        return helpSupplCompApiService.create(request);
    }

    @GetMapping("")
    // "api/help-suppl-comp/?help_num={help_num}&suppl_num={suppl_num}" 형태로 받음
    public Header<HelpSupplCompApiResponse> read(
            @RequestParam(name = "help_num") String helpNum, 
            @RequestParam(name = "suppl_num") String supplNum){
        // 받은 파라미터를 이용하에 PK 객체를 생성하여 read
        HelpSupplCompPK pk = new HelpSupplCompPK(helpNum, supplNum);

        return helpSupplCompApiService.read(pk);
    }

    @PutMapping("")
    public Header<HelpSupplCompApiResponse> update(Header<HelpSupplCompApiRequest> request) {
        return helpSupplCompApiService.update(request);
    }

    @DeleteMapping("")
    // "api/help-suppl-comp/?help_num={help_num}&suppl_num={suppl_num}" 형태로 받음
    public Header delete(
            @RequestParam(name = "help_num") String helpNum, 
            @RequestParam(name = "suppl_num") String supplNum){
        HelpSupplCompPK pk = new HelpSupplCompPK(helpNum, supplNum);
        
        return helpSupplCompApiService.delete(pk);
    }

}