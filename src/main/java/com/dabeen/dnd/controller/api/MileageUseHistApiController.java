// MileageUseHistApiController.java
// interface 층에서 작동하는 MileageUseHistApiController
// PK가 객체이므로 상속받지 않고 직접 구현
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import java.time.LocalDateTime;

import javax.validation.Valid;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.MileageUseHistApiRequest;
import com.dabeen.dnd.model.network.response.MileageUseHistApiResponse;
import com.dabeen.dnd.model.pk.MileageUseHistPK;
import com.dabeen.dnd.service.api.MileageUseHistApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mileage-use-hist")
public class MileageUseHistApiController {
    @Autowired
    private MileageUseHistApiService mileageUseHistApiService;
    
    @Autowired
    private Validator validator;
    
    @PostMapping("")
    public Header<MileageUseHistApiResponse> create(@RequestBody @Valid Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);

        return mileageUseHistApiService.create(request);
    }

    @GetMapping("")
    // "api/mileage-use-hist/?mileage_use_dttm={mileage_use_dttm}&user_num={user_num}" 형태로 받음
    public Header<MileageUseHistApiResponse> read(
            @RequestParam(name = "user_num") String userNum, 
            @RequestParam(name = "mileage_use_dttm") String mileageUesDttm){
        // 받은 파라미터를 이용하에 PK 객체를 생성하여 read
        MileageUseHistPK pk = new MileageUseHistPK(userNum, LocalDateTime.parse(mileageUesDttm));

        return mileageUseHistApiService.read(pk);
    }

    @PutMapping("")
    public Header<MileageUseHistApiResponse> update(@RequestBody @Valid Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
        return mileageUseHistApiService.update(request);
    }

    @DeleteMapping("")
    // "api/help-suppl-comp/?help_num={help_num}&suppl_num={suppl_num}" 형태로 받음
    public Header delete(
            @RequestParam(name = "user_num") String userNum, 
            @RequestParam(name = "mileage_use_dttm") String mileageUesDttm){
        MileageUseHistPK pk = new MileageUseHistPK(userNum, LocalDateTime.parse(mileageUesDttm));
        
        return mileageUseHistApiService.delete(pk);
    }
}