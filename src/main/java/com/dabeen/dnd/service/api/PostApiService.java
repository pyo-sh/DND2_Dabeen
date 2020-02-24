// PostApiService.java
// application 층에서 작동하는 postApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Post;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PostApiRequest;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.repository.AdminRepository;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.PostMapper;
import com.dabeen.dnd.service.BaseService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service
public class PostApiService extends BaseService<PostApiRequest, PostApiResponse, Post> {
    @Autowired
    private PostMapper postMapper;

    @Override
    public Header<PostApiResponse> create(Header<PostApiRequest> request) {
        PostApiRequest requestData = request.getData();

        // Map 객체를 이용하여 쿼리문 생성
        Map<String, Object> postMap = new HashMap<>();

        postMap.put("postNum", null);
        postMap.put("postType", requestData.getPostType());
        postMap.put("title", requestData.getTitle());
        postMap.put("cont", requestData.getCont());
        postMap.put("questerNum", requestData.getQuesterNum());
        postMap.put("rplyerNum", requestData.getRplyerNum());
        postMap.put("questPostNum", requestData.getQuestPostNum());

        postMapper.insert(postMap);
        
        return Header.OK(response(baseRepository.findById((String)postMap.get("postNum")) // 생성된 엔터티의 정보를 response 형태로 전달
                                                .orElseThrow(() -> new NotFoundException("Created entity"))));
    }

    @Override
    public Header<PostApiResponse> read(String num) {
        log.info("{}", num );
        Optional<Post> optional = baseRepository.findById(num);

        return  optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Post"));
    }

    @Override
    public Header<PostApiResponse> update(Header<PostApiRequest> request) {
        PostApiRequest requestData = request.getData();

        Optional<Post> optional = baseRepository.findById(requestData.getPostNum());
        log.info("{}", optional);
  
        return optional.map(post -> {
                    // 제목, 내용 외 수정 불가. 수정하려고 할 시 에러 호출
                    unableUpadateable(post, requestData);

                    post.setTitle(requestData.getTitle())
                        .setCont(requestData.getCont());
                    
                    return post;
                })
                .map(baseRepository::save)
                .map(this::response)
                .map(Header::OK)
                .orElseThrow(() -> new NotFoundException("Post"));
    }

    @Override
    public Header delete(String num) {
        Optional<Post> optional = baseRepository.findById(num);

        return optional.map(post -> {
                        baseRepository.delete(post);
                        return Header.OK();
                    })
                    .orElseThrow(() -> new NotFoundException("Post"));
    }
    
    // Post > PostApiResponse
    public PostApiResponse response(Post post) {
        PostApiResponse postApiResponse = PostApiResponse.builder()
                                                        .postNum(post.getPostNum())
                                                        .postType(post.getPostType())
                                                        .title(post.getTitle())
                                                        .cont(post.getCont())
                                                        .pstnDttm(post.getPstnDttm())
                                                        // 연관관계에 있는 객체가 null이라면 해당 변수를 null로 설정
                                                        .questerNum(post.getQuester() == null ? null : post.getQuester().getUserNum())
                                                        .rplyerNum(post.getRplyer() == null ? null : post.getRplyer().getAdminNum())
                                                        .questPostNum(post.getQuestPost() == null ? null : post.getQuestPost().getPostNum())
                                                        .rplyPost(post.getRplyPost() == null ? null : response(post.getRplyPost()))
                                                        .build();  
        return postApiResponse;
    }

    // 수정 불가능한 컬럼의 수정 여부를 확인하기 위해
    private void unableUpadateable(Post post, PostApiRequest requestData){
        // 게시글 타입
        if(!requestData.getPostType().equals(post.getPostType()))
                        throw new NotUpdateableException("postType");

        // 게시글 게시일시
        if(!requestData.getPstnDttm().equals(post.getPstnDttm()))
            throw new NotUpdateableException("questPstnDttm");
       

        // 질문자
        if(post.getQuester() != null){
            if(!requestData.getQuesterNum().equals(post.getQuester().getUserNum()))
                throw new NotUpdateableException("questerNum");
        } else {
            if(requestData.getQuesterNum() != null)
                throw new NotUpdateableException("questerNum");
        }

        // 답변자
        if(post.getRplyer() != null){    
            if(!requestData.getRplyerNum().equals(post.getRplyer().getAdminNum()))
                throw new NotUpdateableException("rplyerNum");
        } else {
            if(requestData.getRplyerNum() != null)
                throw new NotUpdateableException("rplyerNum");
        }

        // 답변할 질문 게시긑
        if(post.getQuestPost() != null){
            if(!requestData.getQuestPostNum().equals(post.getQuestPost().getPostNum()))
                throw new NotUpdateableException("questPostNum");
        } else {
            if(requestData.getQuestPostNum() != null)
                throw new NotUpdateableException("questPostNum");
        }
    }
}
