// HelpApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/help")
public class HelpApiController extends CrudController<HelpApiRequest,HelpApiResponse,Help>{

}