// AdminApiService.java
// application 층에서 작동하는 AdminApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.repository.AdminRepository;
import com.dabeen.dnd.repository.mapper.AdminMapper;
import com.dabeen.dnd.exception.AlreadyExistedException;
import com.dabeen.dnd.exception.EmailWrongException;
import com.dabeen.dnd.exception.NameWrongException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.exception.PasswordWrongException;
import com.dabeen.dnd.model.entity.Admin;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.AdminApiRequest;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.response.AdminApiResponse;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.service.BaseService;
import com.dabeen.dnd.service.JwtService;
import com.dabeen.dnd.service.MailService;

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

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MailService mailService;

    @Override
    public Header<AdminApiResponse> create(Header<AdminApiRequest> request) {
        AdminApiRequest requestData = request.getData();

                // 이미 존재하는 ID일 경우, 에러 호출
            if (adminRepository.findByAdminId(requestData.getAdminId()).isPresent())
                throw new AlreadyExistedException("\'" + requestData.getAdminId() + "\' 아이디가");
            // 이미 존재하는 EMAIL일 경우, 에러 호출
            if (adminRepository.findByEmail(requestData.getEmail()).isPresent())
                throw new AlreadyExistedException("\'" + requestData.getEmail() + "\' 이메일이");
            // 이미 존재하는 PHONE_NUM일 경우, 에러 호출
            if (adminRepository.findByPhoneNum(requestData.getPhoneNum()).isPresent())
                throw new AlreadyExistedException("해당 휴대폰번호가 ");

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

    /* 사용자 API */

    // 로그인을 위한 메소드
    public Header<LoginApiResponse> login(Header<LoginApiRequest> request){
        LoginApiRequest requestData = request.getData();
        Admin admin = adminRepository.findByAdminId(requestData.getId())
                                    .orElseThrow(() -> new NotFoundException("\'" + requestData.getId() + "\' 아이디의 관리자를"));
      
        if(!passwordEncoder.matches(requestData.getPwd(), admin.getPwd()))
            throw new PasswordWrongException();
      
        return Header.OK(
                LoginApiResponse.builder()
                                .token(jwtService.createToken(admin.getAdminNum(), admin.getAdminId(), null, "admin"))
                                .build()
                );
    }

    public Header<?> findId(Header<FindApiRequest> request){
        FindApiRequest requestData = request.getData();
        Admin admin = adminRepository.findByEmail(requestData.getEmail())
                                    .orElseThrow(() -> new NotFoundException("해당 이메일을 가진 관리자의"));
                   
        if(!admin.getAdminName().equals(requestData.getName()))
            throw new NameWrongException();

        mailService.sendMail(requestData.getEmail(), "아이디를 알려드립니다.", requestData.getName(), "고객님의 아이디는 \'" + admin.getAdminId() + "\' 입니다.");
        
        return Header.OK();
    }
    
   
    public Header<?> findPwd(Header<FindApiRequest> request){
        FindApiRequest requestData = request.getData();
        Admin admin = adminRepository.findByAdminId(requestData.getId())
                                .orElseThrow(() -> new NotFoundException("\'" + requestData.getId() + "\' 아이디의 관리자를"));

        // 입력된 메일과 사용자의 메일이 동일하지 않은 경우
        if(!admin.getEmail().equals(requestData.getEmail()))
            throw new EmailWrongException();

        // 12자리의 임시 비밀번호 생성
        String pwd = "";
		for (int i = 0; i < 12; i++) {
			pwd += (char) ((Math.random() * 26) + 97);
        }

        // 새로운 비밀번호로 변경
        admin.setPwd(passwordEncoder.encode(pwd));
        adminRepository.save(admin);

        mailService.sendMail(admin.getEmail(), "임시 비밀번호를 알려드립니다.", admin.getAdminName(),"고객님의 임시 비밀번호는 " + pwd + " 입니다.");

        return Header.OK();
    }
}