// UserLoginApiController.java
// 사용자의 로그인 관련 컨트롤러
// 사용자 관련 API가 많아 나눕니다.
// 작성자 : 이은비

package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.response.LoginApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserLoginApiController {
    @Autowired
    private UserLoginApiService loginApiSerivce;
    
    @PostMapping("/login")
    public Header<LoginApiResponse> login(@RequestBody Header<LoginApiRequest> request) {
        return  loginApiSerivce.login(request);
    }

    @PostMapping("/findId")
    public Header<?> findId(@RequestBody Header<FindApiRequest> request) {
        return loginApiSerivce.findId(request);
    }

    @PostMapping("/findPwd")
    public Header<?> findPwd(@RequestBody Header<FindApiRequest> request) {
        return loginApiSerivce.findPwd(request);
    }
}