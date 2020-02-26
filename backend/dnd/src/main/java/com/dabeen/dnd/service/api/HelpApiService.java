// HelpApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.repository.CategoryRepository;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.HelpMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


@Transactional
@Service
@Slf4j
public class HelpApiService extends BaseService<HelpApiRequest, HelpApiResponse, Help> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private HelpMapper helpMapper;

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
        helpMap.put("execSggName",helpApiRequest.getExecSggName());

        helpMapper.insert(helpMap);

        return Header.OK(response(baseRepository.findById((String) helpMap.get("helpNum"))
                        .orElseThrow(() -> new NotFoundException("Created Entity"))));
    }

    @Override
    public Header<HelpApiResponse> read(String num) {
        // TODO Auto-generated method stub
        log.info("{}",num);  

        return baseRepository.findById(num).map(help -> response(help)).map(help -> Header.OK(help)).orElseThrow(() -> new NotFoundException("Help"));

        // return baseRepository.findById(num).map(help -> response(help))
        //                 .map(Header::OK)
        //                 .orElseThrow(() -> new NotFoundException("Help"));

    }

    @Override
    public Header<HelpApiResponse> update(Header<HelpApiRequest> request) {
        // TODO Auto-generated method stub
        
        HelpApiRequest helpApiRequest = request.getData();

        Optional<Help> optional = baseRepository.findById(helpApiRequest.getHelpNum());
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
                    help.setExecSggName(helpApiRequest.getExecSggName());

                    log.info("{}",help.getHelpNum());

                    return help;
                })
                .map(baseRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Help"));
    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num).map(help -> {
                                                    baseRepository.delete(help);
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
                                                                    .execSggName(help.getExecSggName())
                                                                    .pymtWhet(help.getPymtWhet()).build();
        
        return helpApiResponse;

    }

}