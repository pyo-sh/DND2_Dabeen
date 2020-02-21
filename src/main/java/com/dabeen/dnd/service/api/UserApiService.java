// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.UserMapper;
import com.dabeen.dnd.exception.IdExistedException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.service.AwsS3Service;
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
    
    @Autowired
    private AwsS3Service awsS3Service; // AWS S3에 이미지를 저장하기 위해서


    // 사용자 생성, 회원가입
    @Override
    public Header<UserApiResponse> create(@Valid Header<UserApiRequest> request) {
        UserApiRequest userApiRequset = request.getData();

        // 이미 존재하는 ID일 경우, 에러 호출
        if (userRepository.findByUserId(userApiRequset.getUserId()).isPresent())
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
                        .blonSggName(userApiRequset.getBlonSggName())
                        .rrnRear(userApiRequset.getRrnRear())
                        .build();

        userMapper.insert(user); // create 쿼리

        return Header.OK(response(user));
    }

    @Override
    public Header<UserApiResponse> read(String num) {
        Optional<User> optional = userRepository.findById(num);

        return optional.map(user -> response(user)).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
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

                        // 이미지를 AWS S3에 저장하고 경로명 반환
                        String picPath = null;
                        try {
                            picPath = awsS3Service.upload(userApiRequset.getPic(), "user", user.getUserNum());
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                        
                        user.setBirthDate(userApiRequset.getBirthDate())
                            .setAddress(userApiRequset.getAddress())
                            .setPhoneNum(userApiRequset.getPhoneNum())
                            .setPwd(encryPwd)
                            .setEmail(userApiRequset.getEmail())
                            .setNickname(userApiRequset.getNickname())
                            .setItdcCont(userApiRequset.getItdcCont())
                            .setSupplWhet(userApiRequset.getSupplWhet())
                            .setBlonSggName(userApiRequset.getBlonSggName())
                            .setPicPath(picPath)
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
    public Header<List<Map<String, String>>> searchHighRateUser(String ssgName) {
        List<Map<String, String>> users = userMapper.selectFiveOderByRate(ssgName);

        return Header.OK(users);
    }

    // 내 문의 APi
    public Header<List<PostApiResponse>> searchQuests(String userNum) {
        Optional<User> optional = userRepository.findById(userNum);

        return optional.map(user -> {
            List<PostApiResponse> responses = user.getQuests().stream().map(quest -> postApiService.response(quest))
                    .collect(Collectors.toList());
            return responses;
        }).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
    }

    // 내가 작성한 도움 API
    public Header<List<HelpApiResponse>> searchWrittenHelps(String userNum, Pageable pageable) {
        Optional<User> optional = userRepository.findById(userNum);
        log.info("{}", pageable.getPageNumber());
        return optional.map(user -> {
            List<HelpApiResponse> responses = new ArrayList<>();

            Integer page = pageable.getPageNumber() - 1;
            Integer size = pageable.getPageSize();

            // pageable의 정보를 이용하여 페이지 처리
            for (int i = page; (i < page + size) && (i < user.getHelps().size()); i++) {
                responses.add(helpApiService.response(user.getHelps().get(i)));
            }

            return responses;
        }).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
    }

    // 내가 받은 평점 API
    public Header<List<HelpSupplCompApiResponse>> searchProvidedHelps(String userNum, Pageable pageable) {
        log.info("{}", userNum);
        Optional<User> optional = userRepository.findById(userNum);

        return optional.map(user -> {
            List<HelpSupplCompApiResponse> responses = new ArrayList<>();

            for (HelpSupplComp helpSupplComp : user.getHelpSupplComps())
                responses.add(helpSupplCompApiService.response(helpSupplComp));

            return responses;
        }).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
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
                                                        .blonSggName(user.getBlonSggName())
                                                        .picPath(user.getPicPath())
                                                        .avgRate(user.getAvgRate())
                                                        .ownMileage(user.getOwnMileage())
                                                        .build();

        return userApiResponse;
    }
}