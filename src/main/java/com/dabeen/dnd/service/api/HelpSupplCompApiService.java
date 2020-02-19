// HelpSupplCompApiService.java
// application 층에서 작동하는 HelpSupplCompApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpSupplCompApiRequest;
import com.dabeen.dnd.model.network.response.HelpCompUserInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.repository.HelpRepository;
import com.dabeen.dnd.repository.HelpSupplCompRepository;
import com.dabeen.dnd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class HelpSupplCompApiService {
    @Autowired
    private HelpSupplCompRepository helpSupplCompRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HelpRepository helpRepository;

    @Autowired
    private UserApiService userApiService;

    public Header<HelpSupplCompApiResponse> create(Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest requestData = request.getData();
        log.info("{}",  requestData);
        // PK 객체 생성
        HelpSupplCompPK pk = new HelpSupplCompPK(requestData.getHelpNum(),requestData.getSupplNum());

        HelpSupplComp helpSupplComp = HelpSupplComp.builder()
                                                    .helpSupplCompPK(new HelpSupplCompPK())
                                                    .suppler(userRepository.findById(requestData.getSupplNum()).orElse(null))
                                                    .help(helpRepository.findById(requestData.getHelpNum()).orElse(null))
                                                    .helpAprvWhet(requestData.getHelpAprvWhet())
                                                    .aprvDttm(requestData.getAprvDttm())
                                                    .astDttm(requestData.getAstDttm())
                                                    .rate(requestData.getRate())
                                                    .astCont(requestData.getAstCont())
                                                    .build();

        HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp);

        return Header.OK(response(newHelpSupplComp));
    }

    public Header<HelpSupplCompApiResponse> read(HelpSupplCompPK pk) {
        Optional<HelpSupplComp> optional = helpSupplCompRepository.findById(pk);

        return optional.map(helpSupplComp -> response(helpSupplComp))
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("HelpSupplComp"));
    }

    public Header<HelpSupplCompApiResponse> update(Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest requestData = request.getData();
        // PK 객체 생성
        HelpSupplCompPK pk = new HelpSupplCompPK(requestData.getHelpNum(), requestData.getSupplNum());

        Optional<HelpSupplComp> optional = helpSupplCompRepository.findById(pk);
        
        return optional.map(helpSupplComp -> {
                    helpSupplComp.setHelpAprvWhet(requestData.getHelpAprvWhet())
                                .setAprvDttm(requestData.getAprvDttm())
                                .setAstDttm(requestData.getAstDttm())
                                .setRate(requestData.getRate())
                                .setAstCont(requestData.getAstCont());
                    return helpSupplComp;
                })
                .map(helpSupplCompRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("HelpSupplComp"));
    }

    public Header delete(HelpSupplCompPK pk) {
        Optional<HelpSupplComp> optional = helpSupplCompRepository.findById(pk);

        return optional.map(HelpSupplComp -> {
                    helpSupplCompRepository.delete(HelpSupplComp);
                    return Header.OK();
                }).orElseThrow(() -> new NotFoundException("HelpSupplComp"));
    }

    // 해당 도움에 신청한 공급자의 목록을 보여주는 API
    public Header<List<HelpCompUserInfoApiResponse>> searchSupplers(String helpNum){
        List<HelpSupplComp> helpSupplComps = helpSupplCompRepository.findByHelpSupplCompPK_helpNum(helpNum);
        List<HelpCompUserInfoApiResponse> userInfos = new ArrayList<>();
        
        for(HelpSupplComp helpSupplComp : helpSupplComps){
            HelpCompUserInfoApiResponse response = HelpCompUserInfoApiResponse.builder()
                                                                                .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                                .aprvDttm(helpSupplComp.getAprvDttm())
                                                                                .astDttm(helpSupplComp.getAstDttm())
                                                                                .rate(helpSupplComp.getRate())
                                                                                .astCont(helpSupplComp.getAstCont())
                                                                                .user(userApiService.response(helpSupplComp.getSuppler()))
                                                                                .build();

            userInfos.add(response);                                                                   
        }
       
        return Header.OK(userInfos);
    }

    // HelpSupplComp > HelpSupplCompApiResponse
    private HelpSupplCompApiResponse response(HelpSupplComp helpSupplComp) {
        HelpSupplCompApiResponse helpSupplCompApiResponse = HelpSupplCompApiResponse.builder()
                                                                                    .helpNum(helpSupplComp.getHelpSupplCompPK().getHelpNum())
                                                                                    .supplNum(helpSupplComp.getHelpSupplCompPK().getSupplNum())
                                                                                    .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                                    .aprvDttm(helpSupplComp.getAprvDttm())
                                                                                    .astDttm(helpSupplComp.getAstDttm())
                                                                                    .rate(helpSupplComp.getRate())
                                                                                    .astCont(helpSupplComp.getAstCont())
                                                                                    .build();

        return helpSupplCompApiResponse;
    }

}