// PymtApiController.java
// interface 층에서 작동하는 PymtApiController
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.response.PymtApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pymt")
public class PymtApiController extends CrudController<PymtApiRequest, PymtApiResponse, Pymt>{

}