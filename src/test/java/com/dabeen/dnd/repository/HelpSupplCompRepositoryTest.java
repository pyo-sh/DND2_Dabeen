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
    
    @Autowired
    private HelpRepository helpRepository;

    @Autowired
    private UserRepository userRepository;

    // @Test
    // public void create() {
    //     String helpNum = "2002160001";
    //     String supplNum = "2002170001";
    //     Whether helpAprvWhet = Whether.n;
        
    //     HelpSupplComp helpSupplComp = HelpSupplComp.builder()
    //                                                 .helpSupplCompPK(new HelpSupplCompPK())
    //                                                 .help(helpRepository.getOne(helpNum))
    //                                                 .suppler(userRepository.getOne(supplNum))
    //                                                 .helpAprvWhet(helpAprvWhet)
    //                                                 .build();
    //     HelpSupplComp newHelpSupplComp = helpSupplCompRepository.save(helpSupplComp);
        
    //     Assert.assertNotNull(newHelpSupplComp);
    // }

    @Test
    public void read(){
        Optional<HelpSupplComp> helpSupplComp = helpSupplCompRepository.findById(new HelpSupplCompPK("200204001", "200204001"));
        Assert.assertNotNull(helpSupplComp);
    }
}
    