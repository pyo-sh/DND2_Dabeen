// AdminApiService.java
// application 층에서 작동하는 AdminApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.repository.mapper.AdminMapper;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Admin;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.AdminApiRequest;
import com.dabeen.dnd.model.network.response.AdminApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class AdminApiService extends BaseService<AdminApiRequest, AdminApiResponse, Admin> {
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Header<AdminApiResponse> create(Header<AdminApiRequest> request) {
        AdminApiRequest requestData = request.getData();

        Admin admin = Admin.builder()
                            .adminName(requestData.getAdminName())
                            .address(requestData.getAddress())
                            .phoneNum(requestData.getPhoneNum())
                            .id(requestData.getId())
                            .pwd(requestData.getPwd())
                            .email(requestData.getEmail())
                            .build();
        adminMapper.insert(admin);

        return Header.OK(response(admin));
    }

    @Override
    public Header<AdminApiResponse> read(String num) {
        Optional<Admin> optional = baseRepository.findById(num);

        return optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Admin"));
    }

    @Override
    public Header<AdminApiResponse> update(Header<AdminApiRequest> request) {
        AdminApiRequest requestData = request.getData();

        Optional<Admin> optional = baseRepository.findById(requestData.getAdminNum());

        return optional.map(admin -> {
                    // 관리자 이름, 아이디는 수정불가. 수정하려고 한다면 에러 호출
                    if(!requestData.getAdminName().equals(admin.getAdminName()))
                        throw new NotUpdateableException("Admin_name");
                    if(!requestData.getId().equals(admin.getId()))
                        throw new NotUpdateableException("Id");

                    admin.setAddress(requestData.getAddress())
                        .setPhoneNum(requestData.getPhoneNum())
                        .setPwd(requestData.getPwd())
                        .setEmail(requestData.getEmail());
                    return admin;
                })
                .map(baseRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Admin"));
    }

    @Override
    public Header delete(String num) {
        Optional<Admin> optional = baseRepository.findById(num);

        return optional.map(admin -> {
                    baseRepository.delete(admin);
                    return Header.OK();
                })
                .orElseThrow(() -> new NotFoundException("Admin"));
    }

    // Admin > AdminApiResponse
    private AdminApiResponse response(Admin admin) {
        AdminApiResponse adminApiResponse = AdminApiResponse.builder() 
                                                            .adminNum(admin.getAdminNum())
                                                            .adminName(admin.getAdminName())
                                                            .address(admin.getAddress())
                                                            .phoneNum(admin.getPhoneNum())
                                                            .id(admin.getId())
                                                            .email(admin.getEmail())
                                                            .build();
                                
        return adminApiResponse;
    }

}