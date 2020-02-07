// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.repository.mapper.UserMapper;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.UserApiRequset;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class UserApiService extends BaseService<UserApiRequset, UserApiResponse, User>{
    @Autowired
    private UserMapper userMapper;

	@Override
	public Header<UserApiResponse> create(@Valid Header<UserApiRequset> request) {
        UserApiRequset userApiRequset = request.getData();
        
        User user = User.builder()
                        .userName(userApiRequset.getUserName())
                        .birthDate(userApiRequset.getBirthDate())
                        .address(userApiRequset.getAddress())
                        .phoneNum(userApiRequset.getPhoneNum())
                        .id(userApiRequset.getId())
                        .pwd(userApiRequset.getPwd())
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
        Optional<User> optional = baseRepository.findById(num);
        
        return optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("User"));
	}

	@Override
	public Header<UserApiResponse> update(@Valid Header<UserApiRequset> request) {
		UserApiRequset userApiRequset = request.getData();
        
        Optional<User> optional = baseRepository.findById(userApiRequset.getUserNum());

        return optional.map(user -> {
                        // 사용자 이름, 아이디, 주민번호 뒷자리는 수정불가. 수정하려고 할 시 에러 호출
                        if(!userApiRequset.getUserName().equals(user.getUserName()))
                            throw new NotUpdateableException("userName");
                        if(!userApiRequset.getId().equals(user.getId()))
                            throw new NotUpdateableException("Id");
                        if(!userApiRequset.getRrnRear().equals(user.getRrnRear()))
                            throw new NotFoundException("rrnRear");
                        
                        user.setBirthDate(userApiRequset.getBirthDate())
                            .setAddress(userApiRequset.getAddress())
                            .setPhoneNum(userApiRequset.getPhoneNum())
                            .setPwd(userApiRequset.getPwd())
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
                    .map(baseRepository::save)
                    .map(this::response)
                    .map(Header::OK)
                    .orElseThrow(() -> new NotFoundException("User"));
	}

	@Override
	public Header delete(String num) {
		Optional<User> optional = baseRepository.findById(num);
       
        return optional.map(user -> {
                    baseRepository.delete(user);
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
                                                        .id(user.getId())
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
}