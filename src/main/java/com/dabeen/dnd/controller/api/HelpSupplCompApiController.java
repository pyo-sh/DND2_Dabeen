// HelpSupplCompApiController.java
// interface 층에서 작동하는 HelpSupplCompApiController
// PK가 객체이므로 상속받지 않고 직접 구현
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpSupplCompApiRequest;
import com.dabeen.dnd.model.network.response.HelpCompUserInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.service.api.HelpSupplCompApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help-suppl-comp")
public class HelpSupplCompApiController{
    @Autowired
    private HelpSupplCompApiService helpSupplCompApiService;
    
    @Autowired
    private Validator validator;

    @PostMapping("")
    public Header<HelpSupplCompApiResponse> create(@RequestBody @Valid Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
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
    public Header<HelpSupplCompApiResponse> update(@RequestBody @Valid Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
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

    // 도움 신청 API, response 형태가 달라 따로 구현
    @PostMapping("/apply")
    public Header<HelpCompUserInfoApiResponse> applyHelp(@RequestBody Header<HelpSupplCompApiRequest> request){
        return helpSupplCompApiService.applyHelp(request);
    }

    // 공급자 승인 API
    @PutMapping("/approved")
    public Header<HelpCompUserInfoApiResponse> supplierApproved(@RequestBody Header<HelpSupplCompApiRequest> request){
        return helpSupplCompApiService.supplierApproved(request);
    }

    // 공급자 승인 취소 API
    @PutMapping("/approved-cancel")
    public Header<HelpCompUserInfoApiResponse> supplierApprovedCancel(@RequestBody Header<HelpSupplCompApiRequest> request){
        return helpSupplCompApiService.supplierApprovedCancel(request);
    }

    // 공급자 평가 API
    @PutMapping("/assessment")
    public Header<HelpCompUserInfoApiResponse> supplierAssessment(@RequestBody Header<HelpSupplCompApiRequest> request){
        return helpSupplCompApiService.supplierAssessment(request);
    }

    // 해당 도움에 신청한 공급자의 목록을 보여주는 API
    @GetMapping("{helpNum}/supplers")
    public Header<List<HelpCompUserInfoApiResponse>> searchSupplers(@PathVariable String helpNum){
        return helpSupplCompApiService.searchSupplers(helpNum);
    }

    // 사용자의 승인된 도움 목록을 보여주는 API, 페이징 처리 
    @GetMapping("{userNum}/supplied-helps")
    public Header<Map<String, Object>> searchSuppliedHelps(@PathVariable String userNum, @PageableDefault(size = 9) Pageable pageable){
        return helpSupplCompApiService.searchSuppliedHelps(userNum, pageable);
    }

    // 공급자가 신청한 도움 API, 페이지 처리
    @GetMapping("{userNum}/applied-helps")
    public Header<Map<String, Object>> searchAppliedHelps(@PathVariable String userNum, @PageableDefault(size = 9) Pageable pageable){
        return helpSupplCompApiService.searchAppliedHelps(userNum, pageable);
    }
}