// BsktApiService.java
// application 층에서 작동하는 BsktApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.BsktApiRequest;
import com.dabeen.dnd.model.network.response.BsktApiResponse;
import com.dabeen.dnd.repository.BsktMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                        .milegeUseWhet(requestData.getMilegeUseWhet())
                        .build();

        // 2개 이상의 객체를 파라미터로 넘기기 위해서
        HashMap<String, Object> map = new HashMap<String, Object>();
       
        map.put("bskt", bskt);
        map.put("sysdate", LocalDateTime.now());

        bsktMapper.insert(map);
        return Header.OK(response(bskt));
    }

    @Override
    public Header<BsktApiResponse> read(String num) {
        Optional<Bskt> optional = baseRepository.findById(num);

        return optional.map(bskt -> response(bskt))
                        .map(Header::OK)
                        .orElseGet(() -> Header.ERROR("Date does not exist."));
    }

    @Override
    public Header<BsktApiResponse> update(Header<BsktApiRequest> request) {
        BsktApiRequest requestData  = request.getData();

        Optional<Bskt> optional = baseRepository.findById(requestData.getBsktNum());
        
        return optional.map(bskt -> {
                bskt.setBsktNum(bskt.getBsktNum())
                    .setBsktUserNum(bskt.getBsktUserNum())
                    .setTotalPrice(bskt.getTotalPrice())
                    .setMilegeUseWhet(bskt.getMilegeUseWhet());
                return bskt;
        })
        .map(baseRepository::save)
        .map(this::response)
        .map(Header::OK)
        .orElseGet(() -> Header.ERROR("Date does not exist."));
    }

    @Override
    public Header delete(String num) {
        Optional<Bskt> optional = baseRepository.findById(num);

        return optional.map(bskt -> {
                    baseRepository.delete(bskt);
                    return Header.OK();
                })
                .orElseGet(() -> Header.ERROR("Date does not exist."));
    }

    // Bskt > BsktApiResponse
    private BsktApiResponse response(Bskt bskt) {
        BsktApiResponse bsktApiResponse = BsktApiResponse.builder()
                                                        .bsktNum(bskt.getBsktNum())
                                                        .bsktUserNum(bskt.getBsktUserNum())
                                                        .totalPrice(bskt.getTotalPrice())
                                                        .milegeUseWhet(bskt.getMilegeUseWhet())
                                                        .build();
        
        return bsktApiResponse;
    }

}
