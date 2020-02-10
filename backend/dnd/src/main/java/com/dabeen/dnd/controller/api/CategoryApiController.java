// CategoryApiController.java
// 작성자 : 권영인

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Category;
import com.dabeen.dnd.model.network.request.CategoryApiRequest;
import com.dabeen.dnd.model.network.response.CategoryApiResponse;

public class CategoryApiController extends CrudController<CategoryApiRequest,CategoryApiResponse,Category>{

}