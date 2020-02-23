// PymtRepositoryTest.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.Pymt;
import com.dabeen.dnd.model.enumclass.PymtMthdType;
import com.dabeen.dnd.model.enumclass.Whether;

import org.junit.Assert;
import org.junit.Before;    
    
public class PymtRepositoryTest extends DemoApplicationTests { 
    @Autowired
    private PymtRepository pymtRepository;

    @Autowired
    private BsktRepository bsktRepository;
    
    @Test
    public void create() {
        String bsktNum = "2002170006";
        PymtMthdType type = PymtMthdType.c;
        BigDecimal pymtPrice = BigDecimal.valueOf(5000);
        Whether whether = Whether.n;

        Pymt pymt = Pymt.builder()
                        .pymtNum(null)
                        .pymtDttm(LocalDateTime.now())
                        .pymtMthdType(type)
                        .pymtPrice(pymtPrice)
                        .refdWhet(whether)
                        .bskt(bsktRepository.findById(bsktNum)
                                            .orElseThrow(() -> new NotFoundException("Bskt")))
                        .build();
                              
        Pymt newPymt = pymtRepository.save(pymt);

        Assert.assertNotNull(newPymt);
    }

    // @Test
    public void read(){
        Optional<Pymt> optional = pymtRepository.findById("2002170001");
        Assert.assertNotNull(optional.isPresent());
    }

}
    