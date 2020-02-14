package com.dabeen.dnd.service.api;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Fqa;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FqaApiRequest;
import com.dabeen.dnd.model.network.response.FqaApiResponse;
import com.dabeen.dnd.service.BaseService;

public class FqaApiService extends BaseService<FqaApiRequest, FqaApiResponse, Fqa> {

    @Override
    public Header<FqaApiResponse> create(Header<FqaApiRequest> request) {
        // TODO Auto-generated method stub
        FqaApiRequest fqaApiRequest = request.getData();

        Fqa fqa = Fqa.builder()
                    .questPstnDttm(fqaApiRequest.getQuestPstnDttm())
                    .title(fqaApiRequest.getTitle())
                    .rplyCont(fqaApiRequest.getRplyCont())
                    .fqaRgistrantNum(fqaApiRequest.getFqaRgistrantNum())
                    .build();

        Fqa newFqa = baseRepository.save(fqa);

        return Header.OK(response(newFqa));
    }

    @Override
    public Header<FqaApiResponse> read(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num)
                            .map(fqa -> Header.OK(response(fqa)))
                            .orElseThrow(()-> new NotFoundException("Fqa"));
    }

    @Override
    public Header<FqaApiResponse> update(Header<FqaApiRequest> request) {
        // TODO Auto-generated method stub
        
        FqaApiRequest fqaApiRequest = request.getData();

        return baseRepository.findById(fqaApiRequest.getFqaNum())
                            .map(fqa -> fqa.setQuestPstnDttm(fqaApiRequest.getQuestPstnDttm())
                                            .setTitle(fqaApiRequest.getTitle())
                                            .setRplyCont(fqaApiRequest.getRplyCont())
                                            .setFqaRgistrantNum(fqaApiRequest.getFqaRgistrantNum())
                                )
                            .map(fqa -> baseRepository.save(fqa))
                            .map(fqa -> Header.OK(response(fqa)))
                            .orElseThrow(() -> new NotFoundException("Fqa"));


    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num)
                            .map(fqa -> {
                                baseRepository.delete(fqa);
                                return Header.OK(response(fqa));
                            })
                            .orElseThrow(() -> new NotFoundException("Fqa"));
    }

    public FqaApiResponse response(Fqa fqa){
        FqaApiResponse fqaApiResponse = FqaApiResponse.builder()
                                                    .fqaNum(fqa.getFqaNum())
                                                    .questPstnDttm(fqa.getQuestPstnDttm())
                                                    .title(fqa.getTitle())
                                                    .rplyCont(fqa.getRplyCont())
                                                    .fqaRgistrantNum(fqa.getFqaRgistrantNum()).build();
        
        return fqaApiResponse;
    }

}