// BsktApiController.java
// interface 층에서 작동하는 BsktApiController
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.network.request.BsktApiRequest;
import com.dabeen.dnd.model.network.response.BsktApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bskt")
public class BsktApiController extends CrudController<BsktApiRequest, BsktApiResponse, Bskt> {
    
}