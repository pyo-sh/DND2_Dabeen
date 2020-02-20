// HelpPicApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpPicApiRequest;
import com.dabeen.dnd.model.network.response.HelpPicApiResponse;
import com.dabeen.dnd.model.pk.HelpPicPK;
import com.dabeen.dnd.repository.HelpPicRepository;
import com.dabeen.dnd.repository.mapper.HelpPicMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Transactional
@Service
public class HelpPicApiService  {

    @Autowired
    private HelpPicRepository helpPicRepository;

    @Autowired
    private HelpPicMapper helpPicMapper;

    public Header<HelpPicApiResponse> create(Header<HelpPicApiRequest> request){
        HelpPicApiRequest helpPicApiRequest = request.getData();

        // HelpPic helpPic = HelpPic.builder().path(helpPicApiRequest.getPath()).build();

        // HelpPic newHelpPic = helpPicRepository.save(helpPic);

        Map<String,Object> helpPicMap = new HashMap<>();
        helpPicMap.put("helpNum",helpPicApiRequest.getHelpNum());
        helpPicMap.put("path",helpPicApiRequest.getPath());       

        // helpPicMapper.insert(helpPic.getHelpPicPK().getHelpNum(), helpPic.getPath());

        helpPicMapper.insert(helpPicMap);


        return Header.OK(response(helpPicRepository.findById(new HelpPicPK((String) helpPicMap.get("helpNum"), (Integer) helpPicMap.get("picOrnu")))
                        .orElseThrow(() -> new NotFoundException("Created Entity"))));

        // return Header.OK(response(helpPicRepository.findById(new HelpPicPK(helpPicMap.get("helpNum"), helpPicMap.get("picOrnu")).orElseThrow(()-> new NotFoundException("HelpPic")
        // )));
    
    }

    public Header<HelpPicApiResponse> read(HelpPicPK helpPicPK){

        log.info("{}",helpPicPK.getHelpNum());
        log.info("{}",helpPicPK.getPicOrnu());

        return helpPicRepository.findById(helpPicPK).map(helpPic -> response(helpPic)).map(helpPic -> Header.OK(helpPic)).orElseThrow(() -> new NotFoundException("HelpPic"));
    
    }

    public Header<HelpPicApiResponse> update(Header<HelpPicApiRequest> request){
        
        HelpPicApiRequest helpPicApiRequest = request.getData();

        HelpPicPK pk = new HelpPicPK(helpPicApiRequest.getHelpNum(), helpPicApiRequest.getPicOrnu());

        return helpPicRepository.findById(pk)
                                .map(helpPic -> helpPic.setPath(helpPicApiRequest.getPath()))
                                .map(newHelpPic -> helpPicRepository.save(newHelpPic))
                                .map(hp -> Header.OK(response(hp))).orElseThrow(() -> new NotFoundException("HelpPic"));
    }

    public Header delete(HelpPicPK helpPicPK){
        
        return helpPicRepository.findById(helpPicPK).map(helpPic -> {
            helpPicRepository.delete(helpPic);
            return Header.OK();
            }).orElseThrow( () -> new NotFoundException("HelpPic"));
    
    }

    public HelpPicApiResponse response(HelpPic helpPic){

        HelpPicApiResponse helpPicApiResponse = HelpPicApiResponse.builder()
                                                           .helpNum(helpPic.getHelpPicPK().getHelpNum())
                                                           .picOrnu(helpPic.getHelpPicPK().getPicOrnu())
                                                           .path(helpPic.getPath()).build();
        
        return helpPicApiResponse;

    }


}