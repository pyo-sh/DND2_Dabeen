// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.Optional;

import javax.validation.Valid;

import com.dabeen.dnd.mapper.UserMapper;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.UserApiRequset;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                        .ownMilege(userApiRequset.getOwnMilege())
                        .build();
    
        userMapper.insert(user); // create 쿼리

        return Header.OK(response(user));
	}

    @Override
	public Header<UserApiResponse> read(String num) {
        Optional<User> optional = baseRepository.findById(num);
        
        return optional.map(user -> response(user))
                        .map(Header::OK)
                        .orElseGet(() -> Header.ERROR("Date does not exist."));
	}

	@Override
	public Header<UserApiResponse> update(@Valid Header<UserApiRequset> request) {
		UserApiRequset userApiRequset = request.getData();
        
        Optional<User> optional = baseRepository.findById(userApiRequset.getUserNum());

        return optional.map(user -> {
                        user.setUserNum(userApiRequset.getUserNum())
                            .setUserName(userApiRequset.getUserName())
                            .setBirthDate(userApiRequset.getBirthDate())
                            .setAddress(userApiRequset.getAddress())
                            .setPhoneNum(userApiRequset.getPhoneNum())
                            .setId(userApiRequset.getId())
                            .setPwd(userApiRequset.getPwd())
                            .setEmail(userApiRequset.getEmail())
                            .setNickname(userApiRequset.getNickname())
                            .setItdcCont(userApiRequset.getItdcCont())
                            .setSupplWhet(userApiRequset.getSupplWhet())
                            .setBlonSggName(userApiRequset.getBlonSggName())
                            .setPicPath(userApiRequset.getPicPath())
                            .setAvgRate(userApiRequset.getAvgRate())
                            .setOwnMilege(userApiRequset.getOwnMilege());
                        return user;
                    })
                    .map(baseRepository::save)
                    .map(this::response)
                    .map(Header::OK)
                    .orElseGet(() -> Header.ERROR("Date does not exist."));
	}

	@Override
	public Header delete(String num) {
		Optional<User> optional = baseRepository.findById(num);
       
        return optional.map(user -> {
                    baseRepository.delete(user);
                    return Header.OK();
                })
                .orElseGet(() -> Header.ERROR("Date does not exist."));
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
                                                        .ownMilege(user.getOwnMilege())
                                                        .build();
        
        return userApiResponse;
    }
}