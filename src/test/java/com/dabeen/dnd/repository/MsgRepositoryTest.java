// MsgRepositoryTest.java
// Msg JPA Repository 단위 테스트를 위한 코드
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

import com.dabeen.dnd.model.entity.Msg;
import com.dabeen.dnd.model.pk.MsgPK;

import org.junit.Before;    
    
// @RunWith(SpringRunner.class)
// @SpringBootTest
public class MsgRepositoryTest {

    // @Autowired
    // private MsgRepository msgRepository;

    // @Before
    // public void setup(){

    // }
        
    // @Test
    // public void create() {

    //     String chatNum = "2002160001";
    //     String msgWriterNum = "2001290001";
    //     LocalDateTime msgSendDttm = LocalDateTime.now();
    //     String cont = "Contents";

    //     MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);

    //     Msg msg = Msg.builder().msgPK(msgPK).cont(cont).build();

    //     Msg newMsg = msgRepository.save(msg);
        
    //     assertThat(newMsg.getMsgPK(),is(msgPK));
    // }
    
    // @Test
    // public void read() {
        
    //     String chatNum = "2002160001";
    //     String msgWriterNum = "2001290001";
    //     LocalDateTime msgSendDttm = LocalDateTime.now();

    //     MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);

    //     Optional<Msg> msg = msgRepository.findById(msgPK);

    //     assertNotNull(msg.isPresent());

    // }
    
    // @Test
    // public void update() {
        
    //     String chatNum = "2002160001";
    //     String msgWriterNum = "2001290001";
    //     LocalDateTime msgSendDttm = LocalDateTime.now();

    //     String updatedCont = "updated Contents";

    //     MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);

    //     msgRepository.findById(msgPK).ifPresent(selectedMsg ->{
    //         selectedMsg.setCont(updatedCont);
    //         msgRepository.save(selectedMsg);
    //     });
    // }
    
    // @Test
    // public void delete() {
        
    //     String chatNum = "2002160001";
    //     String msgWriterNum = "2001290001";
    //     LocalDateTime msgSendDttm = LocalDateTime.now();

    //     MsgPK msgPK = new MsgPK(chatNum, msgWriterNum, msgSendDttm);

    //     Optional<Msg> msg = msgRepository.findById(msgPK);

    //     assertNotNull(msg.isPresent());

    //     msg.ifPresent(selectMsg -> { 
    //        msgRepository.delete(selectMsg);
    //     });

    //     Optional<Msg> deleteMsg = msgRepository.findById(msgPK);
    //     assertNotNull(deleteMsg.isPresent());

    // }
}
    