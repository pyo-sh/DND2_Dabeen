// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.UserMapper;
import com.dabeen.dnd.exception.IdExistedException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.exception.PasswordWrongException;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.service.BaseService;
import com.dabeen.dnd.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Slf4j
@Service
public class UserApiService extends BaseService<UserApiRequest, UserApiResponse, User>{
    @Autowired 
    private UserRepository userRepository; // 추가로 정의된 메소드를 사용하기 위해 userRepository 사용 x

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder; // 패스워드 암호화를 위한 Encoder

    @Autowired
    private JwtService jwtService;

    // 사용자 생성, 회원가입
	@Override
	public Header<UserApiResponse> create(@Valid Header<UserApiRequest> request) {
        UserApiRequest userApiRequset = request.getData();

        // 이미 존재하는 ID일 경우, 에러 호출
        if(userRepository.findByUserId(userApiRequset.getUserId()).isPresent())
            throw new IdExistedException(userApiRequset.getUserId());

        // 비밀번호 암호화
        String encryPwd = passwordEncoder.encode(userApiRequset.getPwd());

        User user = User.builder()
                        .userName(userApiRequset.getUserName())
                        .birthDate(userApiRequset.getBirthDate())
                        .address(userApiRequset.getAddress())
                        .phoneNum(userApiRequset.getPhoneNum())
                        .userId(userApiRequset.getUserId())
                        .pwd(encryPwd)
                        .email(userApiRequset.getEmail())
                        .nickname(userApiRequset.getNickname())
                        .itdcCont(userApiRequset.getItdcCont())
                        .supplWhet(userApiRequset.getSupplWhet())
                        .blonSggName(userApiRequset.getBlonSggName())
                        .picPath(userApiRequset.getPicPath())
                        .rrnRear(userApiRequset.getRrnRear())
                        .avgRate(userApiRequset.getAvgRate())
                        .ownMileage(userApiRequset.getOwnMileage())
                        .build();
    
        userMapper.insert(user); // create 쿼리

        return Header.OK(response(user));
	}

    @Override
	public Header<UserApiResponse> read(String num) {
        Optional<User> optional = userRepository.findById(num);
        
        return optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("User"));
	}

	@Override
	public Header<UserApiResponse> update(@Valid Header<UserApiRequest> request) {
		UserApiRequest userApiRequset = request.getData();
        
        Optional<User> optional = userRepository.findById(userApiRequset.getUserNum());

        return optional.map(user -> {
                        // 사용자 이름, 아이디, 주민번호 뒷자리는 수정불가. 수정하려고 할 시 에러 호출
                        if(!userApiRequset.getUserName().equals(user.getUserName()))
                            throw new NotUpdateableException("userName");
                        if(!userApiRequset.getUserId().equals(user.getUserId()))
                            throw new NotUpdateableException("Id");
                        if(!userApiRequset.getRrnRear().equals(user.getRrnRear()))
                            throw new NotFoundException("rrnRear");
                        
                         // 비밀번호 암호화
                        String encryPwd = passwordEncoder.encode(userApiRequset.getPwd());

                        user.setBirthDate(userApiRequset.getBirthDate())
                            .setAddress(userApiRequset.getAddress())
                            .setPhoneNum(userApiRequset.getPhoneNum())
                            .setPwd(encryPwd)
                            .setEmail(userApiRequset.getEmail())
                            .setNickname(userApiRequset.getNickname())
                            .setItdcCont(userApiRequset.getItdcCont())
                            .setSupplWhet(userApiRequset.getSupplWhet())
                            .setBlonSggName(userApiRequset.getBlonSggName())
                            .setPicPath(userApiRequset.getPicPath())
                            .setAvgRate(userApiRequset.getAvgRate())
                            .setOwnMileage(userApiRequset.getOwnMileage());
                        return user;
                    })
                    .map(userRepository::save)
                    .map(this::response)
                    .map(Header::OK)
                    .orElseThrow(() -> new NotFoundException("User"));
	}

	@Override
	public Header delete(String num) {
		Optional<User> optional = userRepository.findById(num);
       
        return optional.map(user -> {
                    userRepository.delete(user);
                    return Header.OK();
                })
                .orElseThrow(() -> new NotFoundException("User"));
    }

    // User > UserApiResponse 를 위한 메소드
	private UserApiResponse response(User user) {
        UserApiResponse userApiResponse = UserApiResponse.builder()
                                                        .userNum(user.getUserNum())
                                                        .userName(user.getUserName())
                                                        .birthDate(user.getBirthDate())
                                                        .address(user.getAddress())
                                                        .phoneNum(user.getPhoneNum())
                                                        .userId(user.getUserId())
                                                        .email(user.getEmail())
                                                        .nickname(user.getNickname())
                                                        .itdcCont(user.getItdcCont())
                                                        .supplWhet(user.getSupplWhet())
                                                        .blonSggName(user.getBlonSggName())
                                                        .picPath(user.getPicPath())
                                                        .avgRate(user.getAvgRate())
                                                        .ownMileage(user.getOwnMileage())
                                                        .build();
        
        return userApiResponse;
    }

    // 로그인을 위한 메소드
    public Header<LoginApiResponse> login(Header<LoginApiRequest> request){
        LoginApiRequest requestData = request.getData();
        User user = userRepository.findByUserId(requestData.getId())
                                    .orElseThrow(() -> new NotFoundException("The \'" + requestData.getId() +"\' ID"));
      
                                    log.info("requestData.getPwd() {}", passwordEncoder.encode(requestData.getPwd()));
                                    log.info("user.getPwd() {}", user.getPwd());
        if(!passwordEncoder.matches(requestData.getPwd(), user.getPwd()))
            throw new PasswordWrongException();
      

        // 해당 사용자가 공급자인지 아닌지 판단
        String role = user.getSupplWhet().equals(Whether.Y) ? "suppler" : "user";

        return Header.OK(
                LoginApiResponse.builder()
                                .token(jwtService.createToken(user.getUserNum(), role))
                                .build()
                );
    }
}