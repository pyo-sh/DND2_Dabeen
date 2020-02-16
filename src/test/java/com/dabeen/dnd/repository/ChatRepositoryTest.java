// ChatRepositoryTest.java
// Chat JPA Repository 단위 테스트를 위한 코드
// 작성자 : 권영인

package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.hamcrest.core.Is.is;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.model.entity.Chat;
import com.dabeen.dnd.repository.mapper.ChatMapper;

import org.junit.Before;    
    
@RunWith(SpringRunner.class)
@SpringBootTest
public class ChatRepositoryTest {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatMapper chatMapper;

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        LocalDateTime chatGenDttm = LocalDateTime.now();
        String helpNum = "2002110092";
        String cnsrNum = "2002010031";
        String supplNum = "2001010031";

        Chat chat = Chat.builder().chatGenDttm(chatGenDttm).helpNum(helpNum).cnsrNum(cnsrNum).supplNum(supplNum).build();

        chatMapper.insert(chat);

        assertThat(chat.getChatNum(),is("2002150001"));

    }

       
    @Test
    public void read() {
       
        String chatNum = "2002150001";

        Optional<Chat> chat = chatRepository.findById(chatNum);

        assertNotNull(chat.isPresent());

    }

       
    @Test
    public void update() {

        String chatNum = "2002150001";

        String changedCnsrNum = "2001310010";

        Optional<Chat> chat = chatRepository.findById(chatNum);

        chat.ifPresent(selectedChat ->{
            selectedChat.setCnsrNum(changedCnsrNum);
            chatRepository.save(selectedChat);
        });
    }

       
    @Test
    @Transactional
    public void delete() {

        String chatNum = "2002150001";

        Optional<Chat> chat = chatRepository.findById(chatNum);

        assertNotNull(chat.isPresent());

        chat.ifPresent(selectChat -> { 
           chatRepository.delete(selectChat);
        });

        Optional<Chat> deleteChat = chatRepository.findById(chatNum);
        assertNotNull(deleteChat.isPresent());
    }
}
    