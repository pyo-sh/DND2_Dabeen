// UserApiController.java
// interface 층에서 작동하는 UserController
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.dabeen.dnd.exception.NotYourselfException;
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
import org.springframework.security.core.Authentication;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserApiController{
    @Autowired
    private UserApiService userApiService;

    @Autowired
    private Validator validator;
    
    /* jwt 검증때문에 상속없이 직접 구현  */
    // Create 메소드
    @PostMapping("")
    public Header<UserApiResponse> create(@RequestBody @Valid Header<UserApiRequest> request){
        UserApiRequest reqDate = request.getData();
        this.validate(reqDate);

        return userApiService.create(request);
    }

    // Read 메소드
    @GetMapping("{num}") // User의 id와 헷갈려서 num으로 작성
    public Header<UserApiResponse> read(@PathVariable String num){
        return userApiService.read(num);
    }

    // Update 메소드
    @PutMapping("")
    public Header<UserApiResponse> update(@RequestBody @Valid Header<UserApiRequest> request, Authentication authentication){
        UserApiRequest reqDate = request.getData();
        
        this.idVerification(authentication, reqDate.getUserNum());
        this.validate(reqDate);
        
        return userApiService.update(request);
    }

    // Delete 메소드
    @DeleteMapping("{num}")
    public Header delete(@PathVariable String num){
        return userApiService.delete(num);
    }

    /* 사용자 API */

    // 로그인
    @PostMapping("/login")
    public Header<LoginApiResponse> login(@RequestBody Header<LoginApiRequest> request) {
        LoginApiRequest reqDate = request.getData();
        this.validate(reqDate);
        
        return userApiService.login(request);
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public Header<?> findId(@RequestBody Header<FindApiRequest> request) {
        FindApiRequest reqDate = request.getData();
        this.validate(reqDate);

        return userApiService.findId(request);
    }

    // 비밀번호 찾기
    @PostMapping("/find-pwd")
    public Header<?> findPwd(@RequestBody Header<FindApiRequest> request) {
        FindApiRequest reqDate = request.getData();
        this.validate(reqDate);
        
        return userApiService.findPwd(request);
    }

    // 메인 하단배너 - 자신의 소속시군명에 맞는 평점 높은 사용자 5명 출력
    @GetMapping("/main-page")
    public Header<UserHighRateInfoApiResponse> searchHighRateUser(
            @RequestParam(value = "sgg_name", required = false) String sggName,
            @RequestParam(value = "user_num", required = false) String userNum) {
        return userApiService.searchHighRateUser(sggName, userNum);
    }

    // 내 문의 APi
    @GetMapping("{userNum}/quests")
    public Header<List<PostApiResponse>> searchQuests(@PathVariable String userNum, Authentication authentication) {
        this.idVerification(authentication, userNum);

        return userApiService.searchQuests(userNum);
    }

    /* 추가 메소드 */

    // @Vaild 를 통한 검증
    public void validate(Object objcet){
        Errors errors = new BeanPropertyBindingResult(objcet, "event");
        validator.validate(objcet, errors);
    }

    // jwt을 이용하여 본인이 아닐경우 예외 호출
    public void idVerification(Authentication authentication, String userNum){
        if(!authentication.getAuthorities().toString().equals("ROLE_ADMIN")){
            Claims claims = (Claims) authentication.getPrincipal();

            if(!userNum.equals(claims.get("userNum", String.class)))
                throw new NotYourselfException();
        }
    }
}