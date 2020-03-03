// PmytApiService.java
// application 층에서 작동하는 pymtApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.MileageLessThanPriceException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.BsktComp;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.entity.MileageUseHist;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.MileageUseType;
import com.dabeen.dnd.model.enumclass.PymtMthdType;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PymtApiRequest;
import com.dabeen.dnd.model.network.request.PymtExecutionApiRequest;
import com.dabeen.dnd.model.network.response.PymtApiResponse;
import com.dabeen.dnd.model.pk.BsktCompPK;
import com.dabeen.dnd.model.pk.MileageUseHistPK;
import com.dabeen.dnd.repository.BsktCompRepository;
import com.dabeen.dnd.repository.BsktRepository;
import com.dabeen.dnd.repository.HelpRepository;
import com.dabeen.dnd.repository.HelpSupplCompRepository;
import com.dabeen.dnd.repository.MileageUseHistRepository;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.BsktMapper;
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
    private BsktMapper bsktMapper;

    @Autowired
    private BsktCompRepository bsktCompRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private HelpSupplCompRepository helpSupplCompRepository;

    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
   

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
        PymtExecutionApiRequest requestData = request.getData();
        BigDecimal price = new BigDecimal("0.0");
        // 금액 합산을 위해. 한 트랜잭션 단위임으로 bskt를 통해 합산 금액을 못 불러옴

        // Bskt를 생성함
        Map<String, Object> bsktMap = new HashMap<>();

        bsktMap.put("bsktNum", null);
        bsktMap.put("bsktUserNum", requestData.getUserNum());
        bsktMap.put("totalPrice", BigDecimal.valueOf(0));
        bsktMap.put("mileageUseWhet", requestData.getPymtMthdType() == PymtMthdType.m ? Whether.y : Whether.n);

        bsktMapper.insert(bsktMap); 
        
        String bsktNum = bsktMap.get("bsktNum").toString();

        // 입력받은 helpNums를 기반으로 공급자를 찾아 bsktComp을 생성
        for(String helpNum : requestData.getHelpNums()){
            List<HelpSupplComp> helpSupplComps = helpSupplCompRepository.findByHelpSupplCompPK_helpNumAndHelpAprvWhet(helpNum, Whether.y);

            if(helpSupplComps.isEmpty())
                throw new NotFoundException("승인된 사용자의");

            for(HelpSupplComp helpSupplComp: helpSupplComps){
                price = price.add(helpSupplComp.getHelp().getPrice());

                BsktComp bsktComp = BsktComp.builder()
                                            .bsktCompPK(new BsktCompPK())
                                            .bskt(bsktRepository.findById(bsktNum).orElse(null))
                                            .helpSupplComp(helpSupplComp)
                                            .indvHelpPrice(helpSupplComp.getHelp().getPrice()).build();

                bsktCompRepository.save(bsktComp);
            }
        }

        // 마일리지를 사용한 경우, 마일리지 사용이력 엔터티 생성
        if(requestData.getPymtMthdType() == PymtMthdType.m){
            User user = userRepository.findById(requestData.getUserNum())
                                        .orElseThrow(() -> new NotFoundException("User"));

            // 보유 마일리지가 가격보다 작을때 에러
            if(user.getOwnMileage().compareTo(price) == -1)
             throw new MileageLessThanPriceException();

            MileageUseHist mileageUseHist = MileageUseHist.builder()
                                                            .mileageUseHistPK(new MileageUseHistPK(null, LocalDateTime.now()))
                                                            .user(userRepository.findById(requestData.getUserNum())
                                                                                .orElseThrow(() -> new NotFoundException("User")))
                                                            .useType(MileageUseType.u)
                                                            .usePrice(price)
                                                            .bskt(bsktRepository.findById(bsktNum).orElse(null))
                                                            .build();

            mileageUseHistRepository.save(mileageUseHist);
        }

        // bskt를 기반으로 pymt 생성
        Pymt pymt = Pymt.builder()
                        .pymtNum(null)
                        .bskt(bsktRepository.findById(bsktNum).orElse(null))
                        .pymtDttm(LocalDateTime.now())
                        .pymtMthdType(requestData.getPymtMthdType())
                        .pymtPrice(price)
                        .refdWhet(Whether.n)
                        .build();
              
        Pymt newPymt = baseRepository.save(pymt);

        return Header.OK(response(newPymt));
    } 
}