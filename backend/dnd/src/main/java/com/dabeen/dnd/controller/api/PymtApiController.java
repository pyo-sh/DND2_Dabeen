// PymtApiController.java
// interface 층에서 작동하는 PymtApiController
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import java.util.List;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.request.PymtExecutionApiRequest;
import com.dabeen.dnd.model.network.response.PymtApiResponse;
import com.dabeen.dnd.service.api.PymtApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pymt")
public class PymtApiController extends CrudController<PymtApiRequest, PymtApiResponse, Pymt>{
    @Autowired
    private PymtApiService pymtApiService;
    
    @PostMapping("/execution")
    public Header<?> execution(@RequestBody Header<PymtExecutionApiRequest> request){
        return pymtApiService.execution(request);
    } 
}