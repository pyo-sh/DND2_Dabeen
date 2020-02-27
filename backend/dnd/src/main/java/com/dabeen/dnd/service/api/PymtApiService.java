// PmytApiService.java
// application 층에서 작동하는 pymtApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.enumclass.PymtMthdType;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktApiRequest;
import com.dabeen.dnd.model.network.request.BsktCompApiRequest;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.request.PymtExecutionApiRequest;
import com.dabeen.dnd.model.network.response.HelpCompUserInfoApiResponse;
import com.dabeen.dnd.model.network.response.PymtApiResponse;
import com.dabeen.dnd.repository.BsktRepository;
import com.dabeen.dnd.repository.HelpSupplCompRepository;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
@Transactional
@Service
@Slf4j
public class PymtApiService extends BaseService<PymtApiRequest, PymtApiResponse, Pymt> {
    @Autowired
    private BsktRepository bsktRepository;

    @Autowired
    private BsktApiService bsktApiService;

    @Autowired
    private HelpSupplCompRepository helpSupplCompRepository;

    @Autowired
    private BsktCompApiService bsktCompApiService;

    @Override
    public Header<PymtApiResponse> create(Header<PymtApiRequest> request) {
        PymtApiRequest requestData = request.getData();
        
        Pymt pymt = Pymt.builder()
                        .pymtNum(null)
                        .bskt(bsktRepository.findById(requestData.getPymtNum())
                                            .orElseThrow(() -> new NotFoundException("bskt")))
                        .pymtDttm(LocalDateTime.now())
                        .pymtMthdType(requestData.getPymtMthdType())
                        .pymtPrice(requestData.getPymtPrice())
                        .refdWhet(requestData.getRefdWhet())
                        .refdDttm(requestData.getRefdDttm())
                        .build();
              
        Pymt newPymt = baseRepository.save(pymt);
   
        return Header.OK(response(newPymt));
    }

    @Override
    public Header<PymtApiResponse> read(String num) {
        Optional<Pymt> optional = baseRepository.findById(num);

        return  optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Pymt"));
    }

    @Override
    public Header<PymtApiResponse> update(Header<PymtApiRequest> request) {
        PymtApiRequest requestData = request.getData();

        Optional<Pymt> optional = baseRepository.findById(requestData.getPymtNum());

        return optional.map(pymt -> {
                    // 결제일시, 결제금액, 결제수단은 수정 불가능, 수정하려고 할 시 에러 호출
                    if(!requestData.getPymtDttm().equals(pymt.getPymtDttm()))
                        throw new NotUpdateableException("pymtDttm");
                    if(!requestData.getPymtPrice().equals(pymt.getPymtPrice()))
                        throw new NotUpdateableException("pymtPrice");
                    if(!requestData.getPymtMthdType().equals(pymt.getPymtMthdType()))
                        throw new NotUpdateableException("pymtMthdType");

                    pymt.setRefdWhet(requestData.getRefdWhet())
                        .setRefdDttm(requestData.getRefdDttm());
                    
                    return pymt;
                })
                .map(baseRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Pymt"));
    }

    @Override
    public Header delete(String num) {
        Optional<Pymt> optional = baseRepository.findById(num);

        return  optional.map(pymt -> {
                            baseRepository.delete(pymt);
                            return Header.OK();
                        })
                        .orElseThrow(() -> new NotFoundException("Pymt"));
    }

    // Pymt > PymtApiResponse
    private PymtApiResponse response(Pymt pymt) {
        PymtApiResponse pymtApiResponse =  PymtApiResponse.builder() 
                                                        .pymtNum(pymt.getPymtNum())
                                                        .pymtDttm(pymt.getPymtDttm())
                                                        .pymtMthdType(pymt.getPymtMthdType())
                                                        .pymtPrice(pymt.getPymtPrice())
                                                        .refdWhet(pymt.getRefdWhet())
                                                        .refdDttm(pymt.getRefdDttm())
                                                        .build();
        return pymtApiResponse;
    }

    /* 사용자 API */

    // 결제 실행 API, 장바구니와 장바구니 구성 엔터티를 함께 생성
    public Header<?> execution(Header<PymtExecutionApiRequest> request){
        PymtExecutionApiRequest requstData = request.getData();
        BigDecimal price = new BigDecimal("0.0");
        // 금액 합산을 위해. 한 트랜잭션 단위임으로 bskt를 통해 합산 금액을 못 불러옴

        // Bskt를 생성함
        BsktApiRequest bsktApiRequest = BsktApiRequest.builder()
                                                    .bsktUserNum(requstData.getUserNum())
                                                    .totalPrice(BigDecimal.valueOf(0))
                                                    .mileageUseWhet(Whether.n)
                                                    .build();

        String bsktNum = bsktApiService.create(Header.OK(bsktApiRequest))
                                        .getData().getBsktNum();
        
        // 입력받은 helpNums를 기반으로 공급자를 찾아 bsktComp을 생성
        for(String helpNum : requstData.getHelpNums()){
            List<HelpSupplComp> helpSupplComps = helpSupplCompRepository.findByHelpSupplCompPK_helpNum(helpNum);
            
            for(HelpSupplComp helpSupplComp: helpSupplComps){
                price = price.add(helpSupplComp.getHelp().getPrice());

                BsktCompApiRequest bsktCompApiRequest = BsktCompApiRequest.builder()
                                                                            .bsktNum(bsktNum)
                                                                            .helpNum(helpNum)
                                                                            .supplNum(helpSupplComp.getHelpSupplCompPK().getSupplNum())
                                                                            .indvHelpPrice(helpSupplComp.getHelp().getPrice())
                                                                            .build();
                bsktCompApiService.create(Header.OK(bsktCompApiRequest));
            }
        }

        // bskt를 기반으로 pymt 생성
        PymtApiRequest pymtApiRequest = PymtApiRequest.builder()
                                                        .pymtNum(bsktNum)
                                                        .pymtMthdType(PymtMthdType.c)
                                                        .pymtPrice(price)
                                                        .refdWhet(Whether.n)
                                                        .build();
        
        return Header.OK(create(Header.OK(pymtApiRequest)).getData());
    } 
}