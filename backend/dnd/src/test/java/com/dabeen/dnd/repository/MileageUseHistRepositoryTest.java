// MileageUseHistRepositoryTest.java
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.MileageUseHist;
import com.dabeen.dnd.model.enumclass.MileageUseType;
import com.dabeen.dnd.model.pk.MileageUseHistPK;

import org.junit.Assert;   
    
public class MileageUseHistRepositoryTest extends DemoApplicationTests {
    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
   
    @Autowired
    private UserRepository userRepository;
    
    @Test
    public void create() {
        MileageUseHistPK pk = new MileageUseHistPK(null, LocalDateTime.of(20, 02, 17, 1, 48, 36));
        String userNum = "2002170001";
        MileageUseType useType = MileageUseType.w;
        BigDecimal usePrice = BigDecimal.valueOf(500);
        String wdrlAcctNum = "123456789";

        MileageUseHist mileageUseHist = MileageUseHist.builder()
                                                        .mileageUseHistPK(pk)
                                                        .user(userRepository.findById(userNum).orElseThrow(() -> new NotFoundException("User")))
                                                        .useType(useType)
                                                        .usePrice(usePrice)
                                                        .wdrlAcctNum(wdrlAcctNum)
                                                        .build();

        MileageUseHist newMileageUseHist = mileageUseHistRepository.save(mileageUseHist);

        Assert.assertNotNull(newMileageUseHist);
    }

    @Test
    public void read(){
        MileageUseHistPK pk = new MileageUseHistPK("2002170001", LocalDateTime.of(20, 02, 17, 1, 48, 36));

        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);
        Assert.assertNotNull(optional.isPresent());
    }
}
    