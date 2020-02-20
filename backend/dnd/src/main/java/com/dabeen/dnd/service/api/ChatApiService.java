// ChatApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import java.util.HashMap;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Chat;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.ChatApiRequest;
import com.dabeen.dnd.model.network.response.ChatApiResponse;
import com.dabeen.dnd.repository.HelpRepository;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.ChatMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class ChatApiService extends BaseService<ChatApiRequest, ChatApiResponse, Chat> {

    @Autowired
    private ChatMapper chatMapper;

    @Autowired
    private HelpRepository helpRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Header<ChatApiResponse> create(Header<ChatApiRequest> request) {
        // TODO Auto-generated method stub
        ChatApiRequest chatApiRequest = request.getData();

        // Chat chat = Chat.builder()
        //                 .chatGenDttm(chatApiRequest.getChatGenDttm())
        //                 .chatEndDttm(chatApiRequest.getChatEndDttm())
        //                 .help(helpRepository.getOne(chatApiRequest.getHelpNum()))
        //                 .cnsrUser(userRepository.getOne(chatApiRequest.getCnsrNum()))
        //                 .supplUser(userRepository.getOne(chatApiRequest.getSupplNum())).build();

        // Chat newChat = baseRepository.save(chat);

        HashMap<String,Object> chatMap = new HashMap<>();

        chatMap.put("chatNum",null);
        chatMap.put("chatGenDttm",chatApiRequest.getChatGenDttm());
        chatMap.put("helpNum",chatApiRequest.getHelpNum());
        chatMap.put("cnsrNum",chatApiRequest.getCnsrNum());
        chatMap.put("supplNum",chatApiRequest.getSupplNum());

        chatMapper.insert(chatMap);

        
        return Header.OK(response(baseRepository.findById((String) chatMap.get("chatNum"))
                        .orElseThrow(() -> new NotFoundException("Created Entity"))));
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
                                                .setHelp(helpRepository.getOne(chatApiRequest.getHelpNum()))
                                                .setCnsrUser(userRepository.getOne(chatApiRequest.getCnsrNum()))
                                                .setSupplUser(userRepository.getOne(chatApiRequest.getSupplNum())))
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
                                                        .helpNum(chat.getHelp().getHelpNum())
                                                        .cnsrNum(chat.getCnsrUser().getUserNum())
                                                        .supplNum(chat.getSupplUser().getUserNum()).build();
        return chatApiResponse;
    }

}