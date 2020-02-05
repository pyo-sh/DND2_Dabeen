// HelpSupplCompApiService.java
// application 층에서 작동하는 HelpSupplCompApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpSupplCompApiRequest;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;
import com.dabeen.dnd.repository.HelpSupplCompRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelpSupplCompApiService {
    @Autowired
    private HelpSupplCompRepository helpSupplCompRepository;

    public Header<HelpSupplCompApiResponse> create(Header<HelpSupplCompApiRequest> request) {
        HelpSupplCompApiRequest requestData = request.getData();
        // PK 객체 생성
        HelpSupplCompPK pk = new HelpSupplCompPK(requestData.getHelpNum(),requestData.getSupplNum());

        HelpSupplComp helpSupplComp = HelpSupplComp.builder()
                                                    .helpSupplCompPK(pk)
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
                        .orElseGet(() -> Header.ERROR("Date does not exist."));
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
                .orElseGet(() -> Header.ERROR("Date does not exist."));
    }

    public Header delete(HelpSupplCompPK pk) {
        Optional<HelpSupplComp> optional = helpSupplCompRepository.findById(pk);

        return optional.map(HelpSupplComp -> {
                    helpSupplCompRepository.delete(HelpSupplComp);
                    return Header.OK();
                }).orElseGet(() -> Header.ERROR("Date does not exist."));
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