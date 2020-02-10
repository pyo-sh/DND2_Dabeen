// AdminApiService.java
// application 층에서 작동하는 AdminApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.repository.AdminRepository;
import com.dabeen.dnd.repository.mapper.AdminMapper;
import com.dabeen.dnd.exception.IdExistedException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Admin;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.AdminApiRequest;
import com.dabeen.dnd.model.network.response.AdminApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class AdminApiService extends BaseService<AdminApiRequest, AdminApiResponse, Admin> {
    @Autowired 
    private AdminRepository adminRepository; // 추가로 정의된 메소드를 사용하기 위해 adminRepository 사용 x
    
    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private PasswordEncoder passwordEncoder; // 패스워드 암호화를 위한 Encoder

    @Override
    public Header<AdminApiResponse> create(Header<AdminApiRequest> request) {
        AdminApiRequest requestData = request.getData();

        // 이미 존재하는 ID일 경우, 에러 호출
        if(adminRepository.findByAdminId(requestData.getAdminId()).isPresent())
            throw new IdExistedException(requestData.getAdminId());

        // 비밀번호 암호화
        String encryPwd = passwordEncoder.encode(requestData.getPwd());

        Admin admin = Admin.builder()
                            .adminName(requestData.getAdminName())
                            .address(requestData.getAddress())
                            .phoneNum(requestData.getPhoneNum())
                            .adminId(requestData.getAdminId())
                            .pwd(encryPwd)
                            .email(requestData.getEmail())
                            .build();
        adminMapper.insert(admin);

        return Header.OK(response(admin));
    }

    @Override
    public Header<AdminApiResponse> read(String num) {
        Optional<Admin> optional = adminRepository.findById(num);

        return optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Admin"));
    }

    @Override
    public Header<AdminApiResponse> update(Header<AdminApiRequest> request) {
        AdminApiRequest requestData = request.getData();

        Optional<Admin> optional = adminRepository.findById(requestData.getAdminNum());

        return optional.map(admin -> {
                    // 관리자 이름, 아이디는 수정불가. 수정하려고 한다면 에러 호출
                    if(!requestData.getAdminName().equals(admin.getAdminName()))
                        throw new NotUpdateableException("adminName");
                    if(!requestData.getAdminId().equals(admin.getAdminId()))
                        throw new NotUpdateableException("id");

                    // 비밀번호 암호화
                    String encryPwd = passwordEncoder.encode(requestData.getPwd());

                    admin.setAddress(requestData.getAddress())
                        .setPhoneNum(requestData.getPhoneNum())
                        .setPwd(encryPwd)
                        .setEmail(requestData.getEmail());
                    return admin;
                })
                .map(adminRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Admin"));
    }

    @Override
    public Header delete(String num) {
        Optional<Admin> optional = adminRepository.findById(num);

        return optional.map(admin -> {
                    adminRepository.delete(admin);
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
                                                            .adminId(admin.getAdminId())
                                                            .email(admin.getEmail())
                                                            .build();
                                
        return adminApiResponse;
    }

}