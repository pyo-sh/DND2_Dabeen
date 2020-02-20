// PostRepository.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.model.entity.Post;
import com.dabeen.dnd.model.enumclass.PostType;
import com.dabeen.dnd.repository.mapper.PostMapper;

import org.junit.Assert;  
    
public class PostRepositoryTest extends DemoApplicationTests{
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostMapper postMapper;
    
    @Test
    public void create() {
        PostType postType = PostType.q;
        String questerNum = "2002160001";
        String title = "title";
        String cont = "content";

        Map<String, Object> postMap = new HashMap<>();
 
        postMap.put("postNum", null);
        postMap.put("postType", postType);
        postMap.put("title", title);
        postMap.put("cont", cont);
        postMap.put("questerNum", questerNum);
        postMap.put("rplyerNum", null);
        postMap.put("questPostNum", null);

        postMapper.insert(postMap);

        Assert.assertNotNull(Optional.of(postRepository.findById((String)postMap.get("postNum"))));
    }

    @Test
    public void read(){
        Optional<Post> post = postRepository.findById("2002160001");
        Assert.assertNotNull(post.isPresent());
    }
}
    