// MileageUseHistApiService.java
// application 층에서 작동하는 MileageUseHistApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.Optional;

import com.dabeen.dnd.model.entity.MileageUseHist;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.MileageUseHistApiRequest;
import com.dabeen.dnd.model.network.response.MileageUseHistApiResponse;
import com.dabeen.dnd.model.pk.MileageUseHistPK;
import com.dabeen.dnd.repository.MileageUseHistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MileageUseHistApiService {
    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
   
    public Header<MileageUseHistApiResponse> create(Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest requestData = request.getData();
        log.info("{}", request);
        MileageUseHistPK pk = new MileageUseHistPK(requestData.getUserNum(), LocalDateTime.now());

        MileageUseHist mileageUseHist = MileageUseHist.builder()
                                                        .mileageUseHistPK(pk)
                                                        .useType(requestData.getUseType())
                                                        .usePrice(requestData.getUsePrice())
                                                        .bsktNum(requestData.getBsktNum())
                                                        .wdrlAcctNum(requestData.getWdrlAcctNum())
                                                        .pymtNum(requestData.getPymtNum())
                                                        .build();

        MileageUseHist newMileageUseHist = mileageUseHistRepository.save(mileageUseHist);
        
        return Header.OK(response(newMileageUseHist));
    }

    public Header<MileageUseHistApiResponse> read(MileageUseHistPK pk) {
        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);
        
        return  optional.map(this::response)
                        .map(Header::OK)
                        .orElseGet(() -> Header.ERROR("Date does not exist."));
    }

   
    public Header<MileageUseHistApiResponse> update(Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest requestData = request.getData();
        MileageUseHistPK pk = new MileageUseHistPK(requestData.getUserNum(), requestData.getMileageUseDttm());

        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);

        return optional.map(mileageUseHist -> {
                    mileageUseHist.setUseType(requestData.getUseType())
                                .setUsePrice(requestData.getUsePrice())
                                .setBsktNum(requestData.getBsktNum())
                                .setWdrlAcctNum(requestData.getWdrlAcctNum())
                                .setPymtNum(requestData.getPymtNum());
                    return mileageUseHist;
                })
                .map(mileageUseHistRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseGet(() -> Header.ERROR("Date does not exist."));
    }


    public Header delete(MileageUseHistPK pk) {
        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);

        return optional.map(mileagUseHist -> {
                    mileageUseHistRepository.delete(mileagUseHist);
                    return Header.OK();
                }).orElseGet(() -> Header.ERROR("Date does not exist."));
    }

    // MileageUseHist > MileageUseHistApiResponse    
    private MileageUseHistApiResponse response(MileageUseHist mileageUseHist) {
        MileageUseHistApiResponse mileageUseHistApiResponse = MileageUseHistApiResponse.builder()
                                                                            .userNum(mileageUseHist.getMileageUseHistPK().getUserNum())
                                                                            .mileageUseDttm(mileageUseHist.getMileageUseHistPK().getMileageUseDttm())
                                                                            .useType(mileageUseHist.getUseType())
                                                                            .usePrice(mileageUseHist.getUsePrice())
                                                                            .bsktNum(mileageUseHist.getBsktNum())
                                                                            .wdrlAcctNum(mileageUseHist.getWdrlAcctNum())
                                                                            .pymtNum(mileageUseHist.getPymtNum())
                                                                            .build();
        
        return mileageUseHistApiResponse;
    }

}