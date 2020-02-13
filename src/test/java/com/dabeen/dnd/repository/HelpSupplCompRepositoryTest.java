package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.model.entity.HelpSupplComp;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.model.pk.HelpSupplCompPK;

import org.junit.Assert;
import org.junit.Before;    
    
public class HelpSupplCompRepositoryTest extends DemoApplicationTests{
    @Autowired 
    private HelpSupplCompRepository helpSupplCompRepository;
      
    @Test
    public void create() {
        String helpNum = "200204001";
        String supplNum = "200204001";
        Whether helpAprvWhet = Whether.N;
        
        HelpSupplComp helpSupplComp = HelpSupplComp.builder()
                                                    .helpSupplCompPK(new HelpSupplCompPK(helpNum, supplNum))
                                                    .helpAprvWhet(helpAprvWhet)
                                                    .build();
        HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp);
        
        Assert.assertNotNull(newHelpSupplComp);
    }

    @Test
    public void update(){
        Optional<HelpSupplComp> helpSupplComp = helpSupplCompRepository.findById(new HelpSupplCompPK("200204001", "200204001"));
        Assert.assertNotNull(helpSupplComp);
    }
}
    