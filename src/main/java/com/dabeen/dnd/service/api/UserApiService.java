// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.UserMapper;
import com.dabeen.dnd.exception.AlreadyExistedException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.network.response.PageApiResponse;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.model.network.response.UserHighRateInfoApiResponse;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class UserApiService extends BaseService<UserApiRequest, UserApiResponse, User> {
    @Autowired
    private UserRepository userRepository; // 추가로 정의된 메소드를 사용하기 위해 userRepository 사용 x

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder; // 패스워드 암호화를 위한 Encoder

    @Autowired
    private PostApiService postApiService;

    @Autowired
    private HelpApiService helpApiService;

    @Autowired
    private HelpSupplCompApiService helpSupplCompApiService;


    // 사용자 생성, 회원가입
    @Override
    public Header<UserApiResponse> create(@Valid Header<UserApiRequest> request) {
        UserApiRequest userApiRequset = request.getData();

        // 이미 존재하는 ID일 경우, 에러 호출
        if (userRepository.findByUserId(userApiRequset.getUserId()).isPresent())
            throw new AlreadyExistedException("\'" + userApiRequset.getUserId() + "\' 아이디가");
        // 이미 존재하는 EMAIL일 경우, 에러 호출
        if (userRepository.findByEmail(userApiRequset.getEmail()).isPresent())
            throw new AlreadyExistedException("\'" + userApiRequset.getEmail() + "\' 이메일이");
        // 이미 존재하는 PHONE_NUM일 경우, 에러 호출
        if (userRepository.findByPhoneNum(userApiRequset.getPhoneNum()).isPresent())
            throw new AlreadyExistedException("해당 휴대폰번호가 ");

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
                        .build();

        userMapper.insert(user); // create 쿼리

        return Header.OK(response(user));
    }

    @Override
    public Header<UserApiResponse> read(String num) {
        Optional<User> optional = userRepository.findById(num);

        return optional.map(user -> response(user))
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("User"));
    }

    @Override
    public Header<UserApiResponse> update(@Valid Header<UserApiRequest> request) {
        UserApiRequest userApiRequset = request.getData();
        Optional<User> optional = userRepository.findById(userApiRequset.getUserNum());

        return optional.map(user -> {
                        // 사용자 이름, 아이디, 주민번호 뒷자리는 수정불가. 수정하려고 할 시 에러 호출
                        if (!userApiRequset.getUserName().equals(user.getUserName()))
                            throw new NotUpdateableException("userName");
                        if (!userApiRequset.getUserId().equals(user.getUserId()))
                            throw new NotUpdateableException("Id");
                        if (!userApiRequset.getRrnRear().equals(user.getRrnRear()))
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
        }).orElseThrow(() -> new NotFoundException("User"));
    }

    // 메인 하단배너 - 자신의 소속시군명에 맞는 평점 높은 사용자 5명 출력
    public Header<UserHighRateInfoApiResponse> searchHighRateUser(String sggName, String userNum) {
        Map<String, String> map = new HashMap<>();
        map.put("blonSggName", sggName);
        map.put("userNum", userNum);
        
        List<Map<String, Object>> users = userMapper.selectFiveOderByRate(map);
        Boolean ssgUser = (sggName != null ? true : false);

        if (sggName != null && users.isEmpty()){
            map.put("blonSggName", null);
            users = userMapper.selectFiveOderByRate(map);
            ssgUser = false;
        }

        UserHighRateInfoApiResponse response = UserHighRateInfoApiResponse.builder()
                                                                            .ssgUser(ssgUser)
                                                                            .users(users)
                                                                            .build();
        return Header.OK(response);
    }

    // 내 문의 APi
    public Header<List<PostApiResponse>> searchQuests(String userNum) {
        Optional<User> optional = userRepository.findById(userNum);

        return optional.map(user -> {
            List<PostApiResponse> responses = user.getQuests()
                                                    .stream()
                                                    .map(postApiService::response)
                                                    .collect(Collectors.toList());
           
            return responses;
        }).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
    }

    // 내가 작성한 도움 API
    public Header<Map<String, Object>> searchWrittenHelps(String userNum, Pageable pageable) {
        Optional<User> optional = userRepository.findById(userNum);
   
        return optional.map(user -> {
            List<HelpApiResponse> responses = new ArrayList<>();

            Integer page = pageable.getPageNumber();
            Integer size = pageable.getPageSize();

            // pageable의 정보를 이용하여 페이지 처리
            for (int i = page; (i < page + size) && (i < user.getHelps().size()); i++) {
                responses.add(helpApiService.response(user.getHelps().get(i)));
            }

            Map<String, Object> map = new HashMap<>();
            map.put("page", new PageApiResponse(user.getHelps().size(), size));
            map.put("list", responses);

            return map;
        }).map(Header::OK)
        .orElseThrow(() -> new NotFoundException("User"));
    }

    // User > UserApiResponse 를 위한 메소드
    public UserApiResponse response(User user) {
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
                                                        .picPath(user.getPicPath())
                                                        .avgRate(user.getAvgRate())
                                                        .ownMileage(user.getOwnMileage())
                                                        .build();

        return userApiResponse;
    }
}