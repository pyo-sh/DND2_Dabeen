// MileageUseHistRepositoryTest.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.MileageUseHist;
import com.dabeen.dnd.model.enumclass.MileageUseType;
import com.dabeen.dnd.model.pk.MileageUseHistPK;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;   
    
public class MileageUseHistRepositoryTest extends DemoApplicationTests {
    @Autowired
    private MileageUseHistRepository mileageUseHistRepository;
    
    @Autowired
    private UserRepository userRepository;

    // @Test
    public void create() {
        String userNum = "2002160001";
        MileageUseType type = MileageUseType.w;
        BigDecimal price = BigDecimal.valueOf(50000);
        String wdrlAcctNum = "12345";

        MileageUseHistPK pk = new MileageUseHistPK(null, LocalDateTime.of(2020, 02, 5, 12, 48, 36));

        MileageUseHist mileageUseHist = MileageUseHist.builder()
                                                        .mileageUseHistPK(pk)
                                                        .user(userRepository.findById(userNum)
                                                                            .orElseThrow(() -> new NotFoundException("User")))
                                                        .useType(type)
                                                        .usePrice(price)
                                                        .wdrlAcctNum(wdrlAcctNum)
                                                        .build();

        MileageUseHist newMileageUseHist = mileageUseHistRepository.save(mileageUseHist);

        Assert.assertNotNull(newMileageUseHist);
    }

    @Test
    public void read(){
        MileageUseHistPK pk = new MileageUseHistPK("2002160001", LocalDateTime.of(2020, 02, 5, 12, 48, 36));

        Optional<MileageUseHist> optional = mileageUseHistRepository.findById(pk);
        Assert.assertNotNull(optional.isPresent());
    }
}
    