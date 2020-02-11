// CategoryApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Category;
import com.dabeen.dnd.model.network.request.CategoryApiRequest;
import com.dabeen.dnd.model.network.response.CategoryApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryApiController extends CrudController<CategoryApiRequest,CategoryApiResponse,Category>{

}