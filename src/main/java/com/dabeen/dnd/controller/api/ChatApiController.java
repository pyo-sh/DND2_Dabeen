package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.Chat;
import com.dabeen.dnd.model.network.request.ChatApiRequest;
import com.dabeen.dnd.model.network.response.ChatApiResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatApiController extends CrudController<ChatApiRequest,ChatApiResponse,Chat>{

}