// FqaApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Fqa;
import com.dabeen.dnd.model.network.request.FqaApiRequest;
import com.dabeen.dnd.model.network.response.FqaApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fqa")
public class FqaApiController extends CrudController<FqaApiRequest,FqaApiResponse,Fqa>{

}