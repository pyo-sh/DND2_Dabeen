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
import com.dabeen.dnd.repository.BsktRepository;
import com.dabeen.dnd.repository.MileageUseHistRepository;
import com.dabeen.dnd.repository.PymtRepository;
import com.dabeen.dnd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class MileageUseHistApiService {
    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
   
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BsktRepository bsktRepository;

    @Autowired
    private PymtRepository pymtRepository;

    public Header<MileageUseHistApiResponse> create(Header<MileageUseHistApiRequest> request) {
        MileageUseHistApiRequest requestData = request.getData();
        
        MileageUseHistPK pk = new MileageUseHistPK(null, LocalDateTime.now());

        MileageUseHist mileageUseHist = MileageUseHist.builder()
                                                        .mileageUseHistPK(pk)
                                                        .user(userRepository.findById(requestData.getUserNum())
                                                                            .orElseThrow(() -> new NotFoundException("User")))
                                                        .useType(requestData.getUseType())
                                                        .usePrice(requestData.getUsePrice())
                                                        // getOne을 사용할 경우, 객체를 못 찾으면 에러를 호출하므로 findById
                                                        // 이때 findById의 파라미터가 null이면 오류가 발생하므로 null일 경우 아무 엔터티도 존재하지 않는 '0'으로 대체
                                                        .bskt(bsktRepository.findById(requestData.getBsktNum() == null ? "0" : requestData.getBsktNum())
                                                                            .orElse(null))
                                                        .wdrlAcctNum(requestData.getWdrlAcctNum())
                                                        .pymt(pymtRepository.findById(requestData.getPymtNum() == null ? "0" : requestData.getPymtNum())
                                                                            .orElse(null))
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
                    if(mileageUseHist.getBskt() != null){
                        if(!requestData.getBsktNum().equals(mileageUseHist.getBskt().getBsktNum()))
                            throw new NotUpdateableException("bsktNum");
                    } else {
                        if(requestData.getBsktNum() != null)
                            throw new NotUpdateableException("bsktNum");
                    }
                    
                    if(mileageUseHist.getPymt() != null){
                        if(!requestData.getPymtNum().equals(mileageUseHist.getPymt().getPymtNum()))
                            throw new NotUpdateableException("pymtNum");
                    } else {
                        if(requestData.getPymtNum() != null)
                            throw new NotUpdateableException("pymtNum");
                    }               
                    
                    
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
                                                                            .bsktNum(mileageUseHist.getBskt() == null ? null : mileageUseHist.getBskt().getBsktNum())
                                                                            .wdrlAcctNum(mileageUseHist.getWdrlAcctNum())
                                                                            .pymtNum(mileageUseHist.getPymt() == null ? null : mileageUseHist.getPymt().getPymtNum())
                                                                            .build();
        
        return mileageUseHistApiResponse;
    }

}