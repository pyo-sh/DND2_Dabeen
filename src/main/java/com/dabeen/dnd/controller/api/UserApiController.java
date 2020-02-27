// UserApiController.java
// interface 층에서 작동하는 UserController
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import java.util.List;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.model.network.response.UserHighRateInfoApiResponse;
import com.dabeen.dnd.service.api.UserApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserApiController extends CrudController<UserApiRequest, UserApiResponse, User> {
    @Autowired
    private UserApiService userApiService;

    @Autowired
    private Validator validator;

    
    // 로그인
    @PostMapping("/login")
    public Header<LoginApiResponse> login(@RequestBody Header<LoginApiRequest> request) {
        LoginApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
        return userApiService.login(request);
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public Header<?> findId(@RequestBody Header<FindApiRequest> request) {
        FindApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);

        return userApiService.findId(request);
    }

    // 비밀번호 찾기
    @PostMapping("/find-pwd")
    public Header<?> findPwd(@RequestBody Header<FindApiRequest> request) {
        FindApiRequest reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
        return userApiService.findPwd(request);
    }

    // 메인 하단배너 - 자신의 소속시군명에 맞는 평점 높은 사용자 5명 출력
    @GetMapping("/main-page")
    public Header<UserHighRateInfoApiResponse> searchHighRateUser(
            @RequestParam(value = "sgg_name", required = false) String sggName,
            @RequestParam(value = "user_num") String userNum) {
        return userApiService.searchHighRateUser(sggName, userNum);
    }

    // 내 문의 APi
    @GetMapping("{userNum}/quests")
    public Header<List<PostApiResponse>> searchQuests(@PathVariable String userNum) {
        return userApiService.searchQuests(userNum);
    }
}