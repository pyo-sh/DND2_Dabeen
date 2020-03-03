// HelpSupplCompApiService.java
// application 층에서 작동하는 HelpSupplCompApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotAstUserException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpSupplCompApiRequest;
import com.dabeen.dnd.model.network.response.HelpCompHelpInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpCompUserInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.network.response.PageApiResponse;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.repository.HelpRepository;
import com.dabeen.dnd.repository.HelpSupplCompRepository;
import com.dabeen.dnd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private HelpApiService helpApiService;

    public Header<HelpSupplCompApiResponse> create(Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest requestData = request.getData();

        HelpSupplComp helpSupplComp = HelpSupplComp.builder()
                                                    .helpSupplCompPK(new HelpSupplCompPK())
                                                    .suppler(userRepository.findById(requestData.getSupplNum())
                                                                            .orElseThrow(() -> new NotFoundException("User")))
                                                    .help(helpRepository.findById(requestData.getHelpNum())
                                                                        .orElseThrow(() -> new NotFoundException("Help")))
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

    // HelpSupplComp > HelpSupplCompApiResponse
    public HelpSupplCompApiResponse response(HelpSupplComp helpSupplComp) {
        HelpSupplCompApiResponse helpSupplCompApiResponse = HelpSupplCompApiResponse.builder()
                                                                                    .helpNum(helpSupplComp.getHelpSupplCompPK().getHelpNum())
                                                                                    .supplNum(helpSupplComp.getHelpSupplCompPK().getSupplNum())
                                                                                    .compDttm(helpSupplComp.getCompDttm())
                                                                                    .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                                    .aprvDttm(helpSupplComp.getAprvDttm())
                                                                                    .astDttm(helpSupplComp.getAstDttm())
                                                                                    .rate(helpSupplComp.getRate())
                                                                                    .astCont(helpSupplComp.getAstCont())
                                                                                    .build();

        return helpSupplCompApiResponse;
    }

    // helpSupplComp -> HelpCompUserInfoApiResponse
    public HelpCompUserInfoApiResponse responseUser(HelpSupplComp helpSupplComp){
        HelpCompUserInfoApiResponse response = HelpCompUserInfoApiResponse.builder()
                                                                            .compDttm(helpSupplComp.getCompDttm())
                                                                            .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                            .aprvDttm(helpSupplComp.getAprvDttm())
                                                                            .astDttm(helpSupplComp.getAstDttm())
                                                                            .rate(helpSupplComp.getRate())
                                                                            .astCont(helpSupplComp.getAstCont())
                                                                            .user(userApiService.response(helpSupplComp.getSuppler()))
                                                                            .build();
        return response;
    }

    /* 사용자 API */

    // 도움 신청 API
    public Header<HelpCompUserInfoApiResponse> applyHelp(Header<HelpSupplCompApiRequest> request){
        HelpSupplCompApiRequest requestData = request.getData();

        HelpSupplComp helpSupplComp = HelpSupplComp.builder()
                                                    .helpSupplCompPK(new HelpSupplCompPK())
                                                    .suppler(userRepository.findById(requestData.getSupplNum())
                                                                            .orElseThrow(() -> new NotFoundException("User")))
                                                    .help(helpRepository.findById(requestData.getHelpNum())
                                                                        .orElseThrow(() -> new NotFoundException("Help")))
                                                    .build();
                                                
        HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp);

        return Header.OK(responseUser(newHelpSupplComp));
    }

    // 공급자 승인 API
    public Header<HelpCompUserInfoApiResponse> supplierApproved(Header<HelpSupplCompApiRequest> request){
        HelpSupplCompApiRequest requestData = request.getData();
        HelpSupplCompPK pk = new HelpSupplCompPK(requestData.getHelpNum(), requestData.getSupplNum());

        HelpSupplComp helpSupplComp =  helpSupplCompRepository.findById(pk)
                                                            .orElseThrow(() -> new NotFoundException("HelpSupplComp"));

        helpSupplComp.setHelpAprvWhet(Whether.y)
                    .setAprvDttm(LocalDateTime.now());
        
        HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp); 

        return Header.OK(responseUser(newHelpSupplComp));
    }

    // 공급자 평가 API
    public Header<HelpCompUserInfoApiResponse> supplierAssessment(Header<HelpSupplCompApiRequest> request){
        HelpSupplCompApiRequest requestData = request.getData();
        HelpSupplCompPK pk = new HelpSupplCompPK(requestData.getHelpNum(), requestData.getSupplNum());

        HelpSupplComp helpSupplComp =  helpSupplCompRepository.findById(pk)
                                                            .orElseThrow(() -> new NotFoundException("HelpSupplComp"));

        // 승인되지 않은 사용자를 평가하려고 한 경우 에러
        if(helpSupplComp.getHelpAprvWhet() == Whether.n)
            throw new NotAstUserException();
        
        helpSupplComp.setAstDttm(LocalDateTime.now())
                    .setRate(requestData.getRate())
                    .setAstCont(requestData.getAstCont());

        HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp); 

        return Header.OK(responseUser(newHelpSupplComp));
    }

    // 해당 도움에 신청한 공급자의 목록을 보여주는 API
    public Header<List<HelpCompUserInfoApiResponse>> searchSupplers(String helpNum){
        List<HelpSupplComp> helpSupplComps = helpSupplCompRepository.findByHelpSupplCompPK_helpNumOrderByCompDttm(helpNum);

        // 해당 도움 번호의 도움 공급 구성엔터티에서 필요한 속성들만 선택하여 List를 생성하여 반환
        List<HelpCompUserInfoApiResponse> userInfos = helpSupplComps.stream()
                                                                    .map(this::responseUser)
                                                                    .collect(Collectors.toList());
    
       
        return Header.OK(userInfos);
    }

    // 사용자의 승인된 도움 목록을 보여주는 API, 페이징 처리 
    public Header<Map<String, Object>> searchSuppliedHelps(String userNum, Pageable pageable){
        Page<HelpSupplComp> helpSupplComps= helpSupplCompRepository.findByHelpSupplCompPK_SupplNumAndHelpAprvWhetAndHelp_PrefHelpExecDttmBeforeOrderByHelp_HelpNumDesc(userNum, Whether.y, LocalDateTime.now(), pageable);
        List<HelpCompHelpInfoApiResponse> responses = new ArrayList<>();

        helpSupplComps.forEach(helpSupplComp -> {
            HelpCompHelpInfoApiResponse response = HelpCompHelpInfoApiResponse.builder()
                                                                                .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                                .aprvDttm(helpSupplComp.getAprvDttm())
                                                                                .astDttm(helpSupplComp.getAstDttm())
                                                                                .rate(helpSupplComp.getRate())
                                                                                .astCont(helpSupplComp.getAstCont())
                                                                                .help(helpApiService.searchResponse(helpSupplComp.getHelp()))
                                                                                .build();
            responses.add(response);
        });

        Map<String, Object> map = new HashMap<>();
        map.put("page", new PageApiResponse((int)helpSupplComps.getTotalElements(), helpSupplComps.getTotalPages(), pageable.getPageSize()));
        map.put("list", responses);

        return Header.OK(map);
    }

    // 공급자가 신청한 도움 API, 페이지 처리
    public Header<Map<String, Object>> searchAppliedHelps(String userNum, Pageable pageable){
       Page<HelpSupplComp> helpSupplComps= helpSupplCompRepository.findByHelpSupplCompPK_SupplNumAndHelp_PrefHelpExecDttmAfterOrderByHelp_HelpNumDesc(userNum, LocalDateTime.now(), pageable);
       List<HelpCompHelpInfoApiResponse> responses = new ArrayList<>();

       helpSupplComps.forEach(helpSupplComp -> {
           HelpCompHelpInfoApiResponse response = HelpCompHelpInfoApiResponse.builder()
                                                                               .helpAprvWhet(helpSupplComp.getHelpAprvWhet())
                                                                               .aprvDttm(helpSupplComp.getAprvDttm())
                                                                               .astDttm(helpSupplComp.getAstDttm())
                                                                               .rate(helpSupplComp.getRate())
                                                                               .astCont(helpSupplComp.getAstCont())
                                                                               .help(helpApiService.searchResponse(helpSupplComp.getHelp()))
                                                                               .build();
           responses.add(response);
       });

       Map<String, Object> map = new HashMap<>();
       map.put("page", new PageApiResponse((int)helpSupplComps.getTotalElements(), helpSupplComps.getTotalPages(), pageable.getPageSize()));
       map.put("list", responses);

       return Header.OK(map);
    }   
}