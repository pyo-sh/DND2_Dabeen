// AdminApiController.java
// interface 층에서 작동하는 AdminApiController
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Admin;
import com.dabeen.dnd.model.network.request.AdminApiRequest;
import com.dabeen.dnd.model.network.response.AdminApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class AdminApiController extends CrudController<AdminApiRequest, AdminApiResponse, Admin>{

}