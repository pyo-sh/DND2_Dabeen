package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.model.entity.Fqa;
import com.dabeen.dnd.repository.mapper.FqaMapper;

import org.junit.Before;    
    
@RunWith(SpringRunner.class)
@SpringBootTest
public class FqaRepositoryTest {

    @Autowired
    private FqaRepository fqaRepository;

    @Autowired
    private FqaMapper fqaMapper;

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        String fqaRgistrantNum = "2001180001";
        String title = "title";
        String rplyCont = "reply Content of title";

        Fqa fqa = Fqa.builder().fqaRgistrantNum(fqaRgistrantNum).title(title).rplyCont(rplyCont).build();

        fqaMapper.insert(fqa);

        assertThat(fqa.getFqaNum(),is("2002160001"));
    }
    
    @Test
    public void read() {
        
        String fqaNum = "2002160001";

        Optional<Fqa> fqa = fqaRepository.findById(fqaNum);

        assertNotNull(fqa.isPresent());
    
    }
    
    @Test
    public void update() {
        
        String fqaNum = "2002160001";

        String changedRplyCont = "reply Content of title";

        Optional<Fqa> fqa = fqaRepository.findById(fqaNum);

        fqa.ifPresent(selectedFqa->{
            selectedFqa.setRplyCont(changedRplyCont);
            fqaRepository.save(selectedFqa);
        });

    }

    @Test
    @Transactional
    public void delete() {
        
        String fqaNum = "2002160001";

        Optional<Fqa> fqa = fqaRepository.findById(fqaNum);

        assertNotNull(fqa.isPresent());

        fqa.ifPresent(selectFqa -> { 
            fqaRepository.delete(selectFqa);
        });

        Optional<Fqa> deleteFqa = fqaRepository.findById(fqaNum);
        assertNotNull(deleteFqa.isPresent());

    }
}
    