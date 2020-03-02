// PymtApiController.java
// interface 층에서 작동하는 PymtApiController
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import java.util.List;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.exception.NotYourselfException;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.request.PymtExecutionApiRequest;
import com.dabeen.dnd.model.network.response.PymtApiResponse;
import com.dabeen.dnd.service.api.PymtApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/pymt")
public class PymtApiController extends CrudController<PymtApiRequest, PymtApiResponse, Pymt>{
    @Autowired
    private PymtApiService pymtApiService;
    
    @PostMapping("/execution")
    public Header<?> execution(@RequestBody Header<PymtExecutionApiRequest> request, Authentication authentication){
        if(!authentication.getAuthorities().toString().equals("ROLE_ADMIN")){
            Claims claims = (Claims) authentication.getPrincipal();

            // jwt를 이용하여 본인인지 확인
            if(!request.getData().getUserNum().equals(claims.get("userNum", String.class)))
                throw new NotYourselfException();
        }
        
        return pymtApiService.execution(request);
    } 
}