// BsktApiService.java
// application 층에서 작동하는 BsktApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktApiRequest;
import com.dabeen.dnd.model.network.response.BsktApiResponse;
import com.dabeen.dnd.repository.mapper.BsktMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Transactional
@Service
public class BsktApiService extends BaseService<BsktApiRequest, BsktApiResponse, Bskt> {
    @Autowired
    private BsktMapper bsktMapper;

    @Override
    public Header<BsktApiResponse> create(Header<BsktApiRequest> request) {
        BsktApiRequest requestData  = request.getData();

        Bskt bskt = Bskt.builder()
                        .bsktUserNum(requestData.getBsktUserNum())
                        .totalPrice(requestData.getTotalPrice())
                        .mileageUseWhet(requestData.getMileageUseWhet())
                        .build();

        bsktMapper.insert(bskt); // 식별자를 "생성일자 + 순번"으로 하기 위해 mybatis 이용

        return Header.OK(response(bskt));
    }

    @Override
    public Header<BsktApiResponse> read(String num) {
        Optional<Bskt> optional = baseRepository.findById(num);

        return optional.map(bskt -> response(bskt))
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Bskt"));
    }

    @Override
    public Header<BsktApiResponse> update(Header<BsktApiRequest> request) {
        BsktApiRequest requestData  = request.getData();

        Optional<Bskt> optional = baseRepository.findById(requestData.getBsktNum());
        
        return optional.map(bskt -> {
                    // 장바구니 사용자 번호는 수정 불가, 수정하려고 할 시 에러 호출
                    if(!requestData.getBsktUserNum().equals(bskt.getBsktUserNum()))
                        throw new NotUpdateableException("Bskt_user_num");

                    bskt.setBsktNum(requestData.getBsktNum())
                        .setTotalPrice(requestData.getTotalPrice())
                        .setMileageUseWhet(requestData.getMileageUseWhet());
                    return bskt;
                })
                .map(baseRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Bskt"));
    }

    @Override
    public Header delete(String num) {
        Optional<Bskt> optional = baseRepository.findById(num);

        return optional.map(bskt -> {
                    baseRepository.delete(bskt);
                    return Header.OK();
                })
                .orElseThrow(() -> new NotFoundException("Bskt"));
    }

    // Bskt > BsktApiResponse
    private BsktApiResponse response(Bskt bskt) {
        BsktApiResponse bsktApiResponse = BsktApiResponse.builder()
                                                        .bsktNum(bskt.getBsktNum())
                                                        .bsktUserNum(bskt.getBsktUserNum())
                                                        .totalPrice(bskt.getTotalPrice())
                                                        .mileageUseWhet(bskt.getMileageUseWhet())
                                                        .build();
        
        return bsktApiResponse;
    }

}
