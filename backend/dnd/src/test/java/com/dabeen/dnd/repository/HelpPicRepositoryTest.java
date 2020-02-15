package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.entity.HelpPic.HelpPicBuilder;
import com.dabeen.dnd.model.pk.HelpPicPK;
import com.dabeen.dnd.repository.mapper.HelpPicMapper;

import org.junit.Before;    

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HelpPicRepositoryTest {

    @Autowired
    HelpPicRepository HelpPicRepository;

    @Autowired
    HelpPicMapper HelpPicMapper;    

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        String helpNum = "202002130001";

        String path ="path test";

        HelpPicPK helpPicPK = new HelpPicPK(helpNum, null);

        HelpPicBuilder helpPicPK2 = HelpPic.builder().helpPicPK(helpPicPK);
        HelpPic helpPic = helpPicPK2.path(path).build();

        HelpPicMapper.insert(helpPic);

        assertThat(helpPic.getHelpPicPK().getHelpNum(),is("2002130001"));


    }

    
    @Test
    public void read() {
        
    }

    
    @Test
    public void update() {
        
    }

    
    @Test
    public void delete() {
        
    }
}
    