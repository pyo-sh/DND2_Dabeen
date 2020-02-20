// MsgApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Msg;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.MsgApiRequest;
import com.dabeen.dnd.model.network.response.MsgApiResponse;
import com.dabeen.dnd.model.pk.MsgPK;
import com.dabeen.dnd.repository.ChatRepository;
import com.dabeen.dnd.repository.MsgRepository;
import com.dabeen.dnd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class MsgApiService{

    @Autowired
    private MsgRepository msgRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;
 
    public Header<MsgApiResponse> create(Header<MsgApiRequest> request){
        
        MsgApiRequest msgApiRequest = request.getData();

        MsgPK msgPK = new MsgPK(msgApiRequest.getChatNum(), msgApiRequest.getMsgWriterNum(), msgApiRequest.getMsgSendDttm());

        //검토 필요
        Msg msg = Msg.builder()
                    .msgPK(msgPK)
                    .cont(msgApiRequest.getCont())
                    .chat(chatRepository.findById(msgApiRequest.getChatNum()).orElse(null))
                    .writerUser(userRepository.findById(msgApiRequest.getMsgWriterNum()).orElse(null))
                    .build();

        Msg newMsg = msgRepository.save(msg);

        return Header.OK(response(newMsg));
    }

    public Header<MsgApiResponse> read(MsgPK msgPK){
        return msgRepository.findById(msgPK).map(msg -> Header.OK(response(msg))).orElseThrow(()->new NotFoundException("Msg"));
    }

    public Header<MsgApiResponse> update(Header<MsgApiRequest> request){
        
        MsgApiRequest msgApiRequest = request.getData();
        
        MsgPK msgPK = new MsgPK(msgApiRequest.getChatNum(), msgApiRequest.getMsgWriterNum(), msgApiRequest.getMsgSendDttm());

        return msgRepository.findById(msgPK).map(msg -> {
                        msg.setCont(msgApiRequest.getCont());
                        return msg;
                    })
                    .map(msg -> msgRepository.save(msg))
                    .map(msg -> response(msg))
                    .map(msg -> Header.OK(msg))
                    .orElseThrow(()-> new NotFoundException("Msg"));
    }

    public Header delete(MsgPK msgPK){
        return msgRepository.findById(msgPK)
                            .map(msg -> {
                                msgRepository.delete(msg);
                                return Header.OK();
                            })
                            .orElseThrow(() -> new NotFoundException("Msg"));
    }

    public MsgApiResponse response(Msg msg){
        
        MsgPK msgPK = msg.getMsgPK();

        MsgApiResponse msgApiResponse = MsgApiResponse.builder()
                                                    .chatNum(msgPK.getChatNum())
                                                    .msgWriterNum(msgPK.getMsgWriterNum())
                                                    .msgSendDttm(msgPK.getMsgSendDttm())
                                                    .cont(msg.getCont()).build();
        return msgApiResponse;

    }

}