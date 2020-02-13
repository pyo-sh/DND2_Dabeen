package com.dabeen.dnd.controller.api;

import java.time.LocalDateTime;

import javax.validation.Valid;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.MsgApiRequest;
import com.dabeen.dnd.model.network.response.MsgApiResponse;
import com.dabeen.dnd.model.pk.MsgPK;
import com.dabeen.dnd.repository.MsgRepository;
import com.dabeen.dnd.service.api.MsgApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/msg")
public class MsgApiController{

    @Autowired
    MsgApiService msgApiService;

    @PostMapping("")
    public Header<MsgApiResponse> create(@RequestBody @Valid Header<MsgApiRequest> request){
        return msgApiService.create(request);
    }

    @GetMapping("")
    public Header<MsgApiResponse> read(
        @RequestParam(name = "chat_num") String chatNum,
        @RequestParam(name = "msg_writer_num") String msgWriterNum,
        @RequestParam(name = "msg_send_dttm") LocalDateTime msgSendDttm){
        
        MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);
        
        return msgApiService.read(msgPK);
    }

    @PutMapping("")
    public Header<MsgApiResponse> update(@RequestBody @Valid Header<MsgApiRequest> request){
        return msgApiService.update(request);
    }

    @DeleteMapping("")
    public Header delete(
        @RequestParam(name = "chat_num") String chatNum,
        @RequestParam(name = "msg_writer_num") String msgWriterNum,
        @RequestParam(name = "msg_send_dttm") LocalDateTime msgSendDttm){
        
        MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);

        return msgApiService.delete(msgPK);
    }

}