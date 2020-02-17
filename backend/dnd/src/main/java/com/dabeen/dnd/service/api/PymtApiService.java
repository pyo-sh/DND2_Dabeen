// PmytApiService.java
// application 층에서 작동하는 pymtApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.response.PymtApiResponse;
import com.dabeen.dnd.repository.BsktRepository;
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

    @Override
    public Header<PymtApiResponse> create(Header<PymtApiRequest> request) {
        PymtApiRequest requestData = request.getData();
        
        Pymt pymt = Pymt.builder()
                        .pymtDttm(LocalDateTime.now())
                        .pymtMthdType(requestData.getPymtMthdType())
                        .pymtPrice(requestData.getPymtPrice())
                        .refdWhet(requestData.getRefdWhet())
                        .refdDttm(requestData.getRefdDttm())
                        .bskt(bsktRepository.findById(requestData.getPymtNum())
                                            .orElseThrow(() -> new NotFoundException("Bskt")))
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
}