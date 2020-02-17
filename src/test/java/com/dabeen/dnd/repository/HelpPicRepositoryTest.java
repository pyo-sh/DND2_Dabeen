// HelpPicRepositoryTest.java
// HelpPic JPA Repository 단위 테스트를 위한 코드
// 작성자 : 권영인

package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.entity.HelpPic.HelpPicBuilder;
import com.dabeen.dnd.model.pk.HelpPicPK;
import com.dabeen.dnd.repository.mapper.HelpPicMapper;

import org.junit.Before;    

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HelpPicRepositoryTest {

    @Autowired
    HelpPicRepository helpPicRepository;

    @Autowired
    HelpPicMapper helpPicMapper;    

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        String helpNum = "2002130001";

        String path ="path test";

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, null);

        HelpPic helpPic = HelpPic.builder().helpPicPK(helpPicPK).path(path).build();

        helpPicMapper.insert(helpPic.getHelpPicPK().getHelpNum(),helpPic.getPath());
        // helpPicMapper.insert(helpPic);
        // HelpPicMapper.insert(helpPic,helpPic.getHelpPicPK().getHelpNum());

        assertThat(helpPic.getHelpPicPK().getHelpNum(),is("2002130001"));

    }

    
    @Test
    public void read() {
        
        String helpNum = "2002130001";
        Integer picOrnu = 1;

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, picOrnu);

        assertNotNull(helpPicRepository.findById(helpPicPK));

    }

    
    @Test
    public void update() {

        String helpNum = "2002130001";
        Integer picOrnu = 1;

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, picOrnu);

        Optional<HelpPic> helpPic = helpPicRepository.findById(helpPicPK);

        helpPic.ifPresent(selectorHelpPic -> {
            selectorHelpPic.setHelpPicPK(helpPicPK);

            helpPicRepository.save(selectorHelpPic);
        });        
    }

    @Transactional
    @Test
    public void delete() {
       
        String helpNum = "2002130001";
        Integer picOrnu = 1;

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, picOrnu);

        Optional<HelpPic> helpPic = helpPicRepository.findById(helpPicPK);
        
        assertNotNull(helpPic.isPresent());

        helpPic.ifPresent(selectHelpPic -> { 
            helpPicRepository.delete(selectHelpPic);
         });

         Optional<HelpPic> deleteHelp = helpPicRepository.findById(helpPicPK);
         assertNotNull(deleteHelp.isPresent());

    }
}
    