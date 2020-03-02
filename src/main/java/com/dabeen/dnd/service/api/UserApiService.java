// UserApiService.java
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
import com.dabeen.dnd.exception.EmailWrongException;
import com.dabeen.dnd.exception.NameWrongException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.exception.PasswordWrongException;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.request.SupplierApiRequest;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.model.network.response.PageApiResponse;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.model.network.response.UserHighRateInfoApiResponse;
import com.dabeen.dnd.service.BaseService;
import com.dabeen.dnd.service.JwtService;
import com.dabeen.dnd.service.MailService;

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
    private JwtService jwtService;

    @Autowired
    private MailService mailService;

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
                        if (!userApiRequset.getRrnPath().equals(user.getRrnPath()))
                            throw new NotFoundException("rrnPath");

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

    /* 사용자 APi */

    // 로그인을 위한 메소드
    public Header<LoginApiResponse> login(Header<LoginApiRequest> request) {
        LoginApiRequest requestData = request.getData();
        User user = userRepository.findByUserId(requestData.getId())
                .orElseThrow(() -> new NotFoundException("\'" + requestData.getId() + "\' 아이디의 사용자를"));

        if (!passwordEncoder.matches(requestData.getPwd(), user.getPwd()))
            throw new PasswordWrongException();

        // 해당 사용자가 공급자인지 아닌지 판단
        String role = user.getSupplWhet().equals(Whether.y) ? "suppler" : "user";

        return Header.OK(LoginApiResponse.builder()
                .token(jwtService.createToken(user.getUserNum(), user.getUserId(), user.getNickname(), role)).build());
    }
    
    // 아이디 찾기
    public Header<?> findId(Header<FindApiRequest> request) {
        FindApiRequest requestData = request.getData();
        User user = userRepository.findByEmail(requestData.getEmail())
                                    .orElseThrow(() -> new NotFoundException("해당 이메일을 가진 사용자의"));

        if (!user.getUserName().equals(requestData.getName()))
            throw new NameWrongException();

        mailService.sendMail(requestData.getEmail(), "아이디를 알려드립니다.", requestData.getName(),
                "고객님의 아이디는 \'" + user.getUserId() + "\' 입니다.");

        return Header.OK();
    }

    // 비밀번호 찾기
    public Header<?> findPwd(Header<FindApiRequest> request) {
        FindApiRequest requestData = request.getData();
        User user = userRepository.findByUserId(requestData.getId())
                .orElseThrow(() -> new NotFoundException("\'" + requestData.getId() + "\' 아이디의 사용자를"));

        // 입력된 메일과 사용자의 메일이 동일하지 않은 경우
        if (!user.getEmail().equals(requestData.getEmail()))
            throw new EmailWrongException();

        // 12자리의 임시 비밀번호 생성
        String pwd = "";
        for (int i = 0; i < 12; i++) {
            pwd += (char) ((Math.random() * 26) + 97);
        }

        // 새로운 비밀번호로 변경
        user.setPwd(passwordEncoder.encode(pwd));
        userRepository.save(user);

        mailService.sendMail(user.getEmail(), "임시 비밀번호를 알려드립니다.", user.getUserName(), "고객님의 임시 비밀번호는 \'" + pwd + "\' 입니다.");

        return Header.OK();
    }
    
    // 메인 하단배너 - 자신의 소속시군명에 맞는 평점 높은 사용자 5명 출력
    public Header<UserHighRateInfoApiResponse> searchHighRateUser(String sggName, String userNum) {
        Map<String, String> map = new HashMap<>();
        map.put("blonSggName", sggName);
        map.put("userNum", userNum);
        
        List<Map<String, Object>> users = userMapper.selectFiveOderByRate(map);
        Boolean ssgUser = (sggName != null ? true : false);

        // 만약 해당 소속시군구명에 속한 사람이 본인뿐이라면
        if (sggName != null && users.isEmpty()){
            // 전체 사용자 중에서 다시 검색!
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
            List<PostApiResponse> responses = new ArrayList<>();

            responses = user.getQuests()
                            .stream()
                            .map(postApiService::response)
                            .collect(Collectors.toList());
                            
            Collections.sort(responses, Comparator.reverseOrder());

            return responses;
        }).map(Header::OK).orElseThrow(() -> new NotFoundException("User"));
    }

    public Header<UserApiResponse> supplierApplication(Header<SupplierApiRequest> request){
        SupplierApiRequest requestData = request.getData();
        User user = userRepository.findById(requestData.getUserNum())
                                .orElseThrow(() -> new NotFoundException("User"));

        user.setSupplWhet(Whether.y)
            .setPicPath(requestData.getPicPath())
            .setRrnPath(requestData.getRrnPath())
            .setAvgRate(BigDecimal.valueOf(0))
            .setOwnMileage(BigDecimal.valueOf(0));
        
        User newUser = userRepository.save(user);

        return Header.OK(response(newUser));
    }
}