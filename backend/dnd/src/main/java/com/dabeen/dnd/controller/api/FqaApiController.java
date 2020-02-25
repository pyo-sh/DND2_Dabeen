// FqaApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import java.util.List;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Fqa;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FqaApiRequest;
import com.dabeen.dnd.model.network.response.FqaApiResponse;
import com.dabeen.dnd.service.api.FqaApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fqa")
public class FqaApiController extends CrudController<FqaApiRequest,FqaApiResponse,Fqa>{
    @Autowired
    private FqaApiService fqaApiService;

    // 모든 데이터를 불러옴
    @GetMapping("")
    public Header<List<FqaApiResponse>> readAll(){
        return fqaApiService.readAll();
    }
}