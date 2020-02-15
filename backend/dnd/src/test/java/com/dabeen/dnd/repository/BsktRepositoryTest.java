// BsktRepositoryTest.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.enumclass.Whether;

import org.junit.Assert;   
    
public class BsktRepositoryTest extends DemoApplicationTests{
    @Autowired
    private BsktRepository bsktRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void create() {
        String bsktNum = "200205001";
        String bsktUserNum = "200204001";
        BigDecimal totalPrice = BigDecimal.valueOf(10000);
        Whether milegeUseWhet = Whether.y;

        Bskt bskt = Bskt.builder()
                        .bsktNum(bsktNum)
                        .bsktUser(userRepository.getOne(bsktUserNum))
                        .totalPrice(totalPrice)
                        .mileageUseWhet(milegeUseWhet)
                        .build();
        Bskt newBskt = bsktRepository.save(bskt);

        Assert.assertNotNull(newBskt);
    }

    @Test
    public void read(){
        Optional<Bskt> bskt = bsktRepository.findById("200205001");
        Assert.assertNotNull(bskt);
    }
}
    