// HelpApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.enumclass.PymtWhet;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpAppliInfoApiResponse;
import com.dabeen.dnd.model.network.response.HelpExecLocApiResponse;
import com.dabeen.dnd.model.network.response.PageApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.repository.CategoryRepository;
import com.dabeen.dnd.repository.HelpRepository;
import com.dabeen.dnd.repository.HelpSupplCompRepository;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.HelpMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


@Transactional
@Service
@Slf4j
public class HelpApiService extends BaseService<HelpApiRequest, HelpApiResponse, Help> {
    @Autowired
    private HelpRepository helpRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private HelpSupplCompRepository helpSupplCompRepository;

    @Autowired
    private HelpMapper helpMapper;

    @Autowired
    private UserApiService userApiService;

    @Override
    public Header<HelpApiResponse> create(Header<HelpApiRequest> request) {
        // TODO Auto-generated method stub
        HelpApiRequest helpApiRequest = request.getData();
        
        Map<String,Object> helpMap = new HashMap<>();

        helpMap.put("helpNum",null);
        helpMap.put("helpPstnDttm",helpApiRequest.getHelpPstnDttm());
        helpMap.put("catNum",helpApiRequest.getCatNum());
        helpMap.put("cnsrNum", helpApiRequest.getCnsrNum());
        helpMap.put("title",helpApiRequest.getTitle());
        helpMap.put("execLoc",helpApiRequest.getExecLoc());
        helpMap.put("price",helpApiRequest.getPrice());
        helpMap.put("prefSupplNum",helpApiRequest.getPrefSupplNum());
        helpMap.put("prefHelpExecDttm",helpApiRequest.getPrefHelpExecDttm());
        helpMap.put("helpAplyClsDttm",helpApiRequest.getHelpAplyClsDttm());
        helpMap.put("cont",helpApiRequest.getCont());
        // helpMap.put("execSggName",helpApiRequest.getExecSggName());

        helpMapper.insert(helpMap);

        return Header.OK(response(helpRepository.findById((String) helpMap.get("helpNum"))
                        .orElseThrow(() -> new NotFoundException("Created Entity"))));
    }

    @Override
    public Header<HelpApiResponse> read(String num) {
        // TODO Auto-generated method stub
        log.info("{}",num);  

        return helpRepository.findById(num).map(help -> response(help)).map(help -> Header.OK(help)).orElseThrow(() -> new NotFoundException("Help"));

        // return helpRepository.findById(num).map(help -> response(help))
        //                 .map(Header::OK)
        //                 .orElseThrow(() -> new NotFoundException("Help"));

    }

    @Override
    public Header<HelpApiResponse> update(Header<HelpApiRequest> request) {
        // TODO Auto-generated method stub
        
        HelpApiRequest helpApiRequest = request.getData();

        Optional<Help> optional = helpRepository.findById(helpApiRequest.getHelpNum());
        log.info("{}", optional);
        // log.info("{}", optional.get().getHelpNum());
  
        return optional.map(help -> {
                    help.setHelpNum(helpApiRequest.getHelpNum());    
                    help.setHelpPstnDttm(helpApiRequest.getHelpPstnDttm());
                    help.setHelpEndDttm(helpApiRequest.getHelpEndDttm());
                    // help.setCatNum(helpApiRequest.getCatNum());
                    // help.setCnsrNum(helpApiRequest.getCnsrNum());
                    help.setCategory(categoryRepository.getOne(helpApiRequest.getCatNum()));
                    help.setUser(userRepository.getOne(helpApiRequest.getCnsrNum()));
                    help.setTitle(helpApiRequest.getTitle());
                    help.setExecLoc(helpApiRequest.getExecLoc());
                    help.setPrice(helpApiRequest.getPrice());
                    help.setPrefSupplNum(helpApiRequest.getPrefSupplNum());
                    help.setPrefHelpExecDttm(helpApiRequest.getPrefHelpExecDttm());
                    help.setHelpAplyClsDttm(helpApiRequest.getHelpAplyClsDttm());
                    help.setCont(helpApiRequest.getCont());
                    // help.setExecSggName(helpApiRequest.getExecSggName());

                    log.info("{}",help.getHelpNum());

                    return help;
                })
                .map(helpRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Help"));
    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        return helpRepository.findById(num).map(help -> {
                                                    helpRepository.delete(help);
                                                    return Header.OK();
        }).orElseThrow( () -> new NotFoundException("Help"));
    }

    public HelpApiResponse response(Help help){

        HelpApiResponse helpApiResponse = HelpApiResponse.builder().helpNum(help.getHelpNum())
                                                                    .helpPstnDttm(help.getHelpPstnDttm())
                                                                    .helpEndDttm(help.getHelpEndDttm())
                                                                    // .catNum(help.getCatNum())
                                                                    // .cnsrNum(help.getCnsrNum())
                                                                    .catNum(help.getCategory().getCatNum())
                                                                    .cnsrNum(help.getUser().getUserNum())
                                                                    .title(help.getTitle())
                                                                    .execLoc(help.getExecLoc())
                                                                    .price(help.getPrice())
                                                                    .prefSupplNum(help.getPrefSupplNum())
                                                                    .prefHelpExecDttm(help.getPrefHelpExecDttm())
                                                                    .helpAplyClsDttm(help.getHelpAplyClsDttm())
                                                                    .cont(help.getCont())
                                                                    .helpAprvWhet(help.getHelpAprvWhet())
                                                                    // .execSggName(help.getExecSggName())
                                                                    .pymtWhet(help.getPymtWhet()).build();
        
        return helpApiResponse;

    }

    /* 사용자 API */

    // 미결제 도움 API
    public Header<List<HelpAppliInfoApiResponse>> searchNoPaymentHelps(String userNum){
        List<Help> helps = helpRepository.findByUser_UserNumAndPymtWhet(userNum, PymtWhet.n);

        List<HelpAppliInfoApiResponse> responses = new ArrayList<>();
        helps.forEach(help -> {
            // 신청인원
            Long appliNum = helpSupplCompRepository.countByHelpSupplCompPK_helpNum(help.getHelpNum());
            // 승인인원
            Long aprvNum = helpSupplCompRepository.countByHelpSupplCompPK_helpNumAndHelpAprvWhet(help.getHelpNum(), Whether.y);
            
            HelpAppliInfoApiResponse response = HelpAppliInfoApiResponse.builder()
                                                                        .appliNum(appliNum)
                                                                        .aprvNum(aprvNum)
                                                                        .help(this.searchResponse(help))
                                                                        .build();
            responses.add(response);                                                                                        
        });

        return Header.OK(responses);
    }

    // 받을 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 미래인 것
    public Header<Map<String, Object>> searchToReceiveHelps(String userNum, Pageable pageable){
        Page<Help> helps = helpRepository.findByUser_UserNumAndPrefHelpExecDttmAfter(userNum, LocalDateTime.now(), pageable);
        List<HelpAppliInfoApiResponse > responses = new ArrayList<>();
        
        helps.forEach(help -> {
            // 신청인원
            Long appliNum = helpSupplCompRepository.countByHelpSupplCompPK_helpNum(help.getHelpNum());
            // 승인인원
            Long aprvNum = helpSupplCompRepository.countByHelpSupplCompPK_helpNumAndHelpAprvWhet(help.getHelpNum(), Whether.y);
            
            HelpAppliInfoApiResponse response = HelpAppliInfoApiResponse.builder()
                                                                        .appliNum(appliNum)
                                                                        .aprvNum(aprvNum)
                                                                        .help(this.searchResponse(help))
                                                                        .build();
            responses.add(response);                                                                                        
        });

        Map<String, Object> map = new HashMap<>();
        map.put("page", new PageApiResponse((int)helps.getTotalElements(), helps.getTotalPages(), pageable.getPageSize()));
        map.put("list", responses);   

        return Header.OK(map);
    }

    // 받은 도움 APi, 본인이 작성한 도움 중 이행 시간이 현재보다 과거인 것
    public Header<Map<String, Object>> searchReceivedHelps(String userNum, Pageable pageable){
        Page<Help> helps = helpRepository.findByUser_UserNumAndPrefHelpExecDttmBefore(userNum, LocalDateTime.now(), pageable);
        
        List<HelpApiResponse> responses = helps.getContent()
                                                .stream()
                                                .map(this::response)
                                                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("page", new PageApiResponse((int)helps.getTotalElements(), helps.getTotalPages(), pageable.getPageSize()));
        map.put("list", responses);   
             
        return Header.OK(map);
    }


    public Header<Map<String,Object>> searchMainExecLocHelps(String execLoc){

        Map<String,Object> execLocHelpsMap = new HashMap<>();

        List<Help> helps;
        Boolean isResult;
        
        Map<String,String> catNameMap = new HashMap<>();
        catNameMap.put("대여","rent");
        catNameMap.put("심부름","errand");
        catNameMap.put("기타","etc");
        
        LocalDateTime defaultEndDttm = LocalDateTime.of(9999, 12, 31, 23, 59, 59);

        // 기본적인 주소를 통한 help 검색 결과

        for (String catName : catNameMap.keySet()){

            Map<String,Object> catNameHelpMap = new HashMap<>();

            helps = helpRepository.findTop9ByCategory_CatNameAndHelpEndDttmAndExecLocContainingOrderByHelpNumDesc(catName, defaultEndDttm, execLoc);

            isResult = true;

            if(helps.isEmpty()){
                helps = helpRepository.findTop9ByCategory_CatNameAndHelpEndDttmOrderByHelpNumDesc(catName, defaultEndDttm);
                isResult = false;
            }

            List<HelpExecLocApiResponse> response = helps.stream().map(help -> searchResponse(help)).collect(Collectors.toList());

            catNameHelpMap.put("isResult", isResult);
            catNameHelpMap.put("helps", response);

            execLocHelpsMap.put(catNameMap.get(catName)+"Helps",catNameHelpMap);
        }

        return Header.OK(execLocHelpsMap);
    }

    public Header<Map<String,Object>> searchMainHelps(){

        Map<String,Object> execLocHelpsMap = new HashMap<>();

        List<Help> helps;
        Boolean isResult;
        
        Map<String,String> catNameMap = new HashMap<>();
        catNameMap.put("대여","rent");
        catNameMap.put("심부름","errand");
        catNameMap.put("기타","etc");
        
        LocalDateTime defaultEndDttm = LocalDateTime.of(9999, 12, 31, 23, 59, 59);

        // 기본적인 주소를 통한 help 검색 결과

        for (String catName : catNameMap.keySet()){

            Map<String,Object> catNameHelpMap = new HashMap<>();

            helps = helpRepository.findTop9ByCategory_CatNameAndHelpEndDttmOrderByHelpNumDesc(catName, defaultEndDttm);
         
            isResult = helps.isEmpty() == true ? false : true;
         
            List<HelpExecLocApiResponse> response = helps.stream().map(help -> searchResponse(help)).collect(Collectors.toList());

            catNameHelpMap.put("isResult", isResult);
            catNameHelpMap.put("helps", response);

            execLocHelpsMap.put(catNameMap.get(catName)+"Helps",catNameHelpMap);
        }

        return Header.OK(execLocHelpsMap);
    }

    public HelpExecLocApiResponse searchResponse(Help help){

        HelpExecLocApiResponse helpExecLocApiResponse =  HelpExecLocApiResponse.builder()
                                .helpNum(help.getHelpNum())
                                .helpPstnDttm(help.getHelpPstnDttm())
                                .helpEndDttm(help.getHelpEndDttm())
                                .cnsrUser(userApiService.response(help.getUser()))
                                .title(help.getTitle())
                                .execLoc(help.getExecLoc())
                                .price(help.getPrice())
                                .prefSupplNum(help.getPrefSupplNum())
                                .prefHelpExecDttm(help.getPrefHelpExecDttm())
                                .helpAplyClsDttm(help.getHelpAplyClsDttm())
                                .cont(help.getCont())
                                .helpAprvWhet(help.getHelpAprvWhet())
                                .pymtWhet(help.getPymtWhet())
                                .helpPics(help.getHelpPics())
                                .build();
        
        return helpExecLocApiResponse;
        
    }
}