// UserApiController.java
// interface 층에서 작동하는 UserController
// 작성자 : 이은비
package com.dabeen.dnd.controller.api;

import java.util.List;
import java.util.Map;

import com.dabeen.dnd.controller.CrudController;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.UserApiRequest;
import com.dabeen.dnd.model.network.response.HelpApiResponse;
import com.dabeen.dnd.model.network.response.HelpSupplCompApiResponse;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.model.network.response.UserApiResponse;
import com.dabeen.dnd.model.network.response.UserHighRateInfoApiResponse;
import com.dabeen.dnd.service.api.UserApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    // 내가 작성한 도움 API, 페이징 처리
    @GetMapping("{userNum}/written-helps")
    public Header<Map<String, Object>> searchWrittenHelps(@PathVariable String userNum,
            @PageableDefault(size = 15) Pageable pageable) {
        return userApiService.searchWrittenHelps(userNum, pageable);
    }
}