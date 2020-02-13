// PostApiController.java
// interface 층에서 작동하는 UserController
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Post;
import com.dabeen.dnd.model.network.request.PostApiRequest;
import com.dabeen.dnd.model.network.response.PostApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/post")
public class PostApiController extends CrudController<PostApiRequest, PostApiResponse, Post>{
    
}