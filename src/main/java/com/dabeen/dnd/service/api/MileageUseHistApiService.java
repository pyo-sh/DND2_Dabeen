// MileageUseHistApiService.java
// application 층에서 작동하는 MileageUseHistApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.MileageUseHist;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.MileageUseHistApiRequest;
import com.dabeen.dnd.model.network.response.MileageUseHistApiResponse;
import com.dabeen.dnd.model.pk.MileageUseHistPK;
import com.dabeen.dnd.repository.MileageUseHistRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class MileageUseHistApiService {
    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
   
    public Header<MileageUseHistApiResponse> create(Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest requestData = request.getData();
        
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
                        .orElseThrow(() -> new NotFoundException("MileageUseHist"));
    }

   
    public Header<MileageUseHistApiResponse> update(Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest requestData = request.getData();
        MileageUseHistPK pk = new MileageUseHistPK(requestData.getUserNum(), requestData.getMileageUseDttm());

        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);

        return optional.map(mileageUseHist -> {
                    // 장바구니 번호, 결제 번호는 수정 불가. 수정하려고 한다면 에러 호출
                    if(!requestData.getBsktNum().equals(mileageUseHist.getBsktNum()))
                        throw new NotUpdateableException("bsktNum");
                    if(!requestData.getPymtNum().equals(mileageUseHist.getPymtNum()))
                        throw new NotUpdateableException("pymtNum");
                                           
                    mileageUseHist.setUseType(requestData.getUseType())
                                .setUsePrice(requestData.getUsePrice())
                                .setWdrlAcctNum(requestData.getWdrlAcctNum());
                    return mileageUseHist;
                })
                .map(mileageUseHistRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("MileageUseHist"));
    }


    public Header delete(MileageUseHistPK pk) {
        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);

        return optional.map(mileagUseHist -> {
                    mileageUseHistRepository.delete(mileagUseHist);
                    return Header.OK();
                }).orElseThrow(() -> new NotFoundException("MileageUseHist"));
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