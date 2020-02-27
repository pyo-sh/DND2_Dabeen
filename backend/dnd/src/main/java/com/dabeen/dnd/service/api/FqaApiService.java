// FqaApiService.java
// 작성자 : 권영인

package com.dabeen.dnd.service.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Fqa;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FqaApiRequest;
import com.dabeen.dnd.model.network.response.FqaApiResponse;
import com.dabeen.dnd.repository.AdminRepository;
import com.dabeen.dnd.repository.mapper.FqaMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FqaApiService extends BaseService<FqaApiRequest, FqaApiResponse, Fqa> {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FqaMapper fqaMapper; 

    @Override
    public Header<FqaApiResponse> create(Header<FqaApiRequest> request) {
        // TODO Auto-generated method stub
        FqaApiRequest fqaApiRequest = request.getData();

        // Fqa fqa = Fqa.builder()
        //             .questPstnDttm(fqaApiRequest.getQuestPstnDttm())
        //             .title(fqaApiRequest.getTitle())
        //             .rplyCont(fqaApiRequest.getRplyCont())
        //             .admin(adminRepository.getOne(fqaApiRequest.getFqaRgistrantNum()))
        //             .build();

        // Fqa newFqa = baseRepository.save(fqa);

        Map<String,Object> fqaMap = new HashMap<>();

        fqaMap.put("fqaNum",null);
        fqaMap.put("fqaRgistrantNum",fqaApiRequest.getFqaRgistrantNum());
        fqaMap.put("title",fqaApiRequest.getTitle());
        fqaMap.put("rplyCont",fqaApiRequest.getRplyCont());

        fqaMapper.insert(fqaMap);        

        return Header.OK(response(baseRepository.findById((String)fqaMap.get("fqaNum")) // 생성된 엔터티의 정보를 response 형태로 전달
                                                .orElseThrow(() -> new NotFoundException("Created entity"))));
    }

    @Override
    public Header<FqaApiResponse> read(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num)
                            .map(fqa -> Header.OK(response(fqa)))
                            .orElseThrow(()-> new NotFoundException("Fqa"));
    }

    @Override
    public Header<FqaApiResponse> update(Header<FqaApiRequest> request) {
        // TODO Auto-generated method stub
        
        FqaApiRequest fqaApiRequest = request.getData();

        return baseRepository.findById(fqaApiRequest.getFqaNum())
                            .map(fqa -> fqa.setQuestPstnDttm(fqaApiRequest.getQuestPstnDttm())
                                            .setTitle(fqaApiRequest.getTitle())
                                            .setRplyCont(fqaApiRequest.getRplyCont())
                                            .setAdmin(adminRepository.getOne(fqaApiRequest.getFqaRgistrantNum()))
                                )
                            .map(fqa -> baseRepository.save(fqa))
                            .map(fqa -> Header.OK(response(fqa)))
                            .orElseThrow(() -> new NotFoundException("Fqa"));
    }

    @Override
    public Header delete(String num) {
        // TODO Auto-generated method stub
        return baseRepository.findById(num)
                            .map(fqa -> {
                                baseRepository.delete(fqa);
                                return Header.OK(response(fqa));
                            })
                            .orElseThrow(() -> new NotFoundException("Fqa"));
    }

    public FqaApiResponse response(Fqa fqa){
        FqaApiResponse fqaApiResponse = FqaApiResponse.builder()
                                                    .fqaNum(fqa.getFqaNum())
                                                    .questPstnDttm(fqa.getQuestPstnDttm())
                                                    .title(fqa.getTitle())
                                                    .rplyCont(fqa.getRplyCont())
                                                    .fqaRgistrantNum(fqa.getAdmin().getAdminNum()).build();
        
        return fqaApiResponse;
    }

    /* 사용자 API */

    // 모든 데이터를 불러옴
    public Header<List<FqaApiResponse>> readAll(){
        List<FqaApiResponse> responses = baseRepository.findAll()
                                                        .stream()
                                                        .map(this::response)
                                                        .collect(Collectors.toList());
        return Header.OK(responses);
    }
}