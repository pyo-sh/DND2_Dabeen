// BsktRepositoryTest.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.model.entity.Bskt;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.repository.mapper.BsktMapper;

import org.junit.Assert;   
    
// public class BsktRepositoryTest extends DemoApplicationTests{
public class BsktRepositoryTest{
    @Autowired
    private BsktRepository bsktRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BsktMapper bsktMapper;

    @Test
    public void create() {
        String bsktUserNum = "2002160001";
        BigDecimal totalPrice = BigDecimal.valueOf(10000);
        Whether milegeUseWhet = Whether.y;

        Map<String, Object> bsktMap = new HashMap<>();

        bsktMap.put("bsktNum", null);
        bsktMap.put("bsktUserNum", bsktUserNum);
        bsktMap.put("totalPrice", totalPrice);
        bsktMap.put("mileageUseWhet", milegeUseWhet);

        bsktMapper.insert(bsktMap); 

        Assert.assertNotNull(Optional.of(bsktRepository.findById((String) bsktMap.get("bsktNum"))));
    }

    // @Test
    // public void read(){
    //     Optional<Bskt> bskt = bsktRepository.findById("2002160001");
    //     Assert.assertNotNull(bskt);
    // }
}
    