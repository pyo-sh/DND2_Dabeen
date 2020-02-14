package com.dabeen.dnd.service.api;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Chat;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.ChatApiRequest;
import com.dabeen.dnd.model.network.response.ChatApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.stereotype.Service;

@Transactional
@Service
public class ChatApiService extends BaseService<ChatApiRequest, ChatApiResponse, Chat> {

    @Override
    public Header<ChatApiResponse> create(Header<ChatApiRequest> request) {
        // TODO Auto-generated method stub
        ChatApiRequest chatApiRequest = request.getData();

        Chat chat = Chat.builder()
                        .chatGenDttm(chatApiRequest.getChatGenDttm())
                        .chatEndDttm(chatApiRequest.getChatEndDttm())
                        .helpNum(chatApiRequest.getHelpNum())
                        .cnsrNum(chatApiRequest.getCnsrNum())
                        .supplNum(chatApiRequest.getSupplNum()).build();

        Chat newChat = baseRepository.save(chat);

        return Header.OK(response(newChat));
    }

    @Override
    public Header<ChatApiResponse> read(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num)
                                .map(chat -> Header.OK(response(chat)))
                                .orElseThrow(() -> new NotFoundException("Chat"));
    }

    @Override
    public Header<ChatApiResponse> update(Header<ChatApiRequest> request) {
        // TODO Auto-generated method stub
        
        ChatApiRequest chatApiRequest = request.getData();

        return baseRepository.findById(chatApiRequest.getChatNum())
                                .map(chat-> chat.setChatGenDttm(chatApiRequest.getChatGenDttm())
                                                .setChatEndDttm(chatApiRequest.getChatEndDttm())
                                                .setHelpNum(chatApiRequest.getHelpNum())
                                                .setCnsrNum(chatApiRequest.getCnsrNum())
                                                .setSupplNum(chatApiRequest.getSupplNum()))
                                .map(chat -> baseRepository.save(chat))
                                .map(chat -> Header.OK(response(chat)))
                                .orElseThrow(() -> new NotFoundException("Chat"));

    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        
        return baseRepository.findById(num)
                                .map(chat -> {
                                        baseRepository.delete(chat);
                                        return Header.OK();
                                    })
                                .orElseThrow(() -> new NotFoundException("Chat"));
    }

    public ChatApiResponse response(Chat chat){
        ChatApiResponse chatApiResponse = ChatApiResponse.builder()
                                                        .chatNum(chat.getChatNum())
                                                        .chatGenDttm(chat.getChatGenDttm())
                                                        .chatEndDttm(chat.getChatEndDttm())
                                                        .helpNum(chat.getHelpNum())
                                                        .cnsrNum(chat.getCnsrNum())
                                                        .supplNum(chat.getSupplNum()).build();
        return chatApiResponse;
    }

}