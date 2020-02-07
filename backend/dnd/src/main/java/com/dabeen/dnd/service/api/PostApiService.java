// PostApiService.java
// application 층에서 작동하는 postApiService
// 작성자 : 이은비

package com.dabeen.dnd.service.api;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.model.entity.Post;
import com.dabeen.dnd.model.enumclass.PostType;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.PostApiRequest;
import com.dabeen.dnd.model.network.response.PostApiResponse;
import com.dabeen.dnd.repository.mapper.PostMapper;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class PostApiService extends BaseService<PostApiRequest, PostApiResponse, Post> {
    @Autowired
    private PostMapper postMapper;

    @Override
    public Header<PostApiResponse> create(Header<PostApiRequest> request) {
        PostApiRequest requestData = request.getData();

        Post post = Post.builder()
                        .postType(requestData.getPostType())
                        .title(requestData.getTitle())
                        .cont(requestData.getCont())
                        .questerNum(requestData.getQuesterNum())
                        .rplyerNum(requestData.getRplyerNum())
                        .questPostNum(requestData.getQuestPostNum())
                        .build();

        // 질문의 타입에 따라 그에 맞는 게시일시를 현재시간으로 저장
        // 쿼리문으로도 할 수 있으나, response 형태를 맞추기 위해서는 해당 객체를 read해야 하므로 service에서 처리
        if(post.getPostType().equals(PostType.q))
            post.setQuestPstnDttm(LocalDateTime.now());
        else post.setRplyPstnDttm(LocalDateTime.now());

        postMapper.insert(post);
        
        return Header.OK(response(post));
    }

    @Override
    public Header<PostApiResponse> read(String num) {
        Optional<Post> optional = baseRepository.findById(num);

        return  optional.map(this::response)
                        .map(Header::OK)
                        .orElseThrow(() -> new NotFoundException("Post"));
    }

    @Override
    public Header<PostApiResponse> update(Header<PostApiRequest> request) {
        PostApiRequest requestData = request.getData();

        Optional<Post> optional = baseRepository.findById(requestData.getPostNum());

        return optional.map(post -> {
                    // 제목, 내용 외 수정 불가. 수정하려고 할 시 에러 호출
                    if(!requestData.getPostType().equals(post.getPostType()))
                        throw new NotUpdateableException("postType");
                    if(!requestData.getQuestPstnDttm().equals(post.getQuestPstnDttm()))
                        throw new NotUpdateableException("questPstnDttm");
                    if(!requestData.getQuesterNum().equals(post.getQuesterNum()))
                        throw new NotUpdateableException("questerNum");
                    if(!requestData.getRplyPstnDttm().equals(post.getRplyPstnDttm()))
                        throw new NotUpdateableException("rplyPstnDttm");
                    if(!requestData.getRplyerNum().equals(post.getRplyerNum()))
                        throw new NotUpdateableException("rplyerNum");
                    if(!requestData.getQuestPostNum().equals(post.getQuestPostNum()))
                        throw new NotUpdateableException("questPostNum");
                   
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
    private PostApiResponse response(Post post) {
        PostApiResponse postApiResponse = PostApiResponse.builder()
                                                        .postNum(post.getPostNum())
                                                        .postType(post.getPostType())
                                                        .title(post.getTitle())
                                                        .cont(post.getCont())
                                                        .questPstnDttm(post.getQuestPstnDttm())
                                                        .questerNum(post.getQuesterNum())
                                                        .rplyPstnDttm(post.getRplyPstnDttm())
                                                        .rplyerNum(post.getRplyerNum())
                                                        .questPostNum(post.getQuestPostNum())
                                                        .build();  
        return postApiResponse;
    }

}