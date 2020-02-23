// BsktApiService.java
// application 층에서 작동하는 BsktApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktApiRequest;
import com.dabeen.dnd.model.network.response.BsktApiResponse;
import com.dabeen.dnd.repository.BsktRepository;
import com.dabeen.dnd.repository.UserRepository;
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

        // Map 객체를 이용하여 쿼리문 생성
        Map<String, Object> bsktMap = new HashMap<>();

        bsktMap.put("bsktNum", requestData.getBsktNum());
        bsktMap.put("bsktUserNum", requestData.getBsktUserNum());
        bsktMap.put("totalPrice", requestData.getTotalPrice());
        bsktMap.put("mileageUseWhet", requestData.getMileageUseWhet());

        bsktMapper.insert(bsktMap); 

        return Header.OK(response(baseRepository.findById((String) bsktMap.get("bsktNum")) // 생성된 엔터티의 정보를 response 형태로 전달
                                                .orElseThrow(() -> new NotFoundException("Created entity"))));
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
                    if(!requestData.getBsktUserNum().equals(bskt.getBsktUser().getUserNum()))
                        throw new NotUpdateableException("bsktUserNum");

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
                                                        .bsktUserNum(bskt.getBsktUser().getUserNum())
                                                        .totalPrice(bskt.getTotalPrice())
                                                        .mileageUseWhet(bskt.getMileageUseWhet())
                                                        .build();
        
        return bsktApiResponse;
    }

}
