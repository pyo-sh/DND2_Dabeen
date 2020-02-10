// HelpApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.service.BaseService;

public class HelpApiService extends BaseService<HelpApiRequest, HelpApiResponse, Help> {

    @Override
    public Header<HelpApiResponse> create(Header<HelpApiRequest> request) {
        // TODO Auto-generated method stub
        HelpApiRequest helpApiRequest = request.getData();

        Help help = Help.builder().helpPstnDttm(helpApiRequest.getHelpPstnDttm())
                                    .catNum(helpApiRequest.getCatNum())
                                    .cnsrNum(helpApiRequest.getCnsrNum())
                                    .title(helpApiRequest.getTitle())
                                    .execLoc(helpApiRequest.getExecLoc())
                                    .price(helpApiRequest.getPrice())
                                    .prefSupplNum(helpApiRequest.getPrefSupplNum())
                                    .prefHelpExecDttm(helpApiRequest.getPrefHelpExecDttm())
                                    .helpAplyClsDttm(helpApiRequest.getHelpAplyClsDttm())
                                    .cont(helpApiRequest.getCont())
                                    .execSggName(helpApiRequest.getExecSggName()).build();
        
        Help newHelp = baseRepository.save(help);
        
        return Header.OK(response(newHelp));
    }

    @Override
    public Header<HelpApiResponse> read(String num) {
        // TODO Auto-generated method stub
        
        return baseRepository.findById(num).map(help -> response(help)).map(help -> Header.OK(help)).orElseThrow(() -> new NotFoundException("Help"));

    }

    @Override
    public Header<HelpApiResponse> update(Header<HelpApiRequest> request) {
        // TODO Auto-generated method stub
        
        HelpApiRequest helpApiRequest = request.getData();

        return baseRepository.findById(helpApiRequest.getHelpNum()).map(help -> help.setHelpPstnDttm(helpApiRequest.getHelpPstnDttm())
                                                                                    .setCatNum(helpApiRequest.getCatNum())
                                                                                    .setCnsrNum(helpApiRequest.getCnsrNum())
                                                                                    .setTitle(helpApiRequest.getTitle())
                                                                                    .setExecLoc(helpApiRequest.getExecLoc())
                                                                                    .setPrice(helpApiRequest.getPrice())
                                                                                    .setPrefSupplNum(helpApiRequest.getPrefSupplNum())
                                                                                    .setPrefHelpExecDttm(helpApiRequest.getPrefHelpExecDttm())
                                                                                    .setHelpAplyClsDttm(helpApiRequest.getHelpAplyClsDttm())
                                                                                    .setCont(helpApiRequest.getCont())
                                                                                    .setHelpAprvWhet(helpApiRequest.getHelpAprvWhet())
                                                                                    .setExecSggName(helpApiRequest.getExecSggName()))
                                                                                    .map(
                                                                                        newHelp -> baseRepository.save(newHelp)
                                                                                    ).map(
                                                                                        h -> Header.OK(response(h))
                                                                                    ).orElseThrow(() -> new NotFoundException("Help"));
        
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
                                                                    .catNum(help.getCatNum())
                                                                    .cnsrNum(help.getCnsrNum())
                                                                    .title(help.getTitle())
                                                                    .execLoc(help.getExecLoc())
                                                                    .price(help.getPrice())
                                                                    .prefSupplNum(help.getPrefSupplNum())
                                                                    .prefHelpExecDttm(help.getPrefHelpExecDttm())
                                                                    .helpAplyClsDttm(help.getHelpAplyClsDttm())
                                                                    .cont(help.getCont())
                                                                    .helpAprvWhet(help.getHelpAprvWhet())
                                                                    .execSggName(help.getExecSggName()).build();
        
        return helpApiResponse;

    }

}