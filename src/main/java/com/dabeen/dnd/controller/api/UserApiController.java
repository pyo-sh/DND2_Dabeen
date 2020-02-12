// UserApiController.java
// interface 층에서 작동하는 UserController
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.FindApiRequest;
import com.dabeen.dnd.model.network.request.LoginApiRequest;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.LoginApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.service.JwtService;
import com.dabeen.dnd.service.api.UserApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserApiController extends CrudController<UserApiRequest, UserApiResponse, User>{
    @Autowired
    private UserApiService userApiService;
    
    @PostMapping("/login")
    public Header<LoginApiResponse> login(@RequestBody Header<LoginApiRequest> request){
        return userApiService.login(request);
    }

    @PostMapping("/findId")
    public Header<?> findId(@RequestBody Header<FindApiRequest> request){
        return userApiService.findId(request);
    }

    @PostMapping("/findPwd")
    public Header<?> findPwd(@RequestBody Header<FindApiRequest> request){
        return userApiService.findPwd(request);
    }
}