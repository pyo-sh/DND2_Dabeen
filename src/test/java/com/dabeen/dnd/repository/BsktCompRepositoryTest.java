// BsktCompRepositoryTest.java
// BsktComp JPA Repository 단위 테스트를 위한 코드
// 작성자 : 권영인

package com.dabeen.dnd.repository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.hamcrest.core.Is.is;

import java.math.BigDecimal;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.model.entity.BsktComp;
import com.dabeen.dnd.model.pk.BsktCompPK;

import org.junit.Before;    
    
@RunWith(SpringRunner.class)
@SpringBootTest
public class BsktCompRepositoryTest {

    @Autowired
    private BsktCompRepository bsktCompRepository;

    @Before
    public void setup(){

    }
        
    @Test
    public void create() {
        
        String bsktNum = "2002150001";

        String helpNum = "2002120001";

        String supplNum = "2002150010";

        BigDecimal indvHelpPrice = BigDecimal.valueOf(1000000);

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpNum, supplNum);

        BsktComp bsktComp = BsktComp.builder().bsktCompPK(bsktCompPK).indvHelpPrice(indvHelpPrice).build();

        BsktComp newBsktComp = bsktCompRepository.save(bsktComp);

        assertThat(newBsktComp.getBsktCompPK().getBsktNum(),is("2002150001"));

    }

    
    @Test
    public void read() {

        String bsktNum = "2002150001";

        String helpNum = "2002120001";

        String supplNum = "2002150010";

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpNum, supplNum);

        Optional<BsktComp> bsktComp = bsktCompRepository.findById(bsktCompPK);

        assertNotNull(bsktComp.isPresent());

    }

    
    @Test
    public void update() {
        
        String bsktNum = "2002150001";

        String helpNum = "2002120001";

        String supplNum = "2002150010";

        BigDecimal indvHelpPrice = BigDecimal.valueOf(1000);

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpNum, supplNum);

        Optional<BsktComp> bsktComp = bsktCompRepository.findById(bsktCompPK);

        bsktComp.ifPresent(selectedBstkComp -> {
            selectedBstkComp.setIndvHelpPrice(indvHelpPrice);
            bsktCompRepository.save(selectedBstkComp);
        });

    }

    
    @Test
    @Transactional
    public void delete() {
        
        String bsktNum = "2002150001";

        String helpNum = "2002120001";

        String supplNum = "2002150010";

        BsktCompPK bsktCompPK = new BsktCompPK(bsktNum, helpNum, supplNum);

        Optional<BsktComp> bsktComp = bsktCompRepository.findById(bsktCompPK);

        assertNotNull(bsktComp.isPresent());

        bsktComp.ifPresent(selectedBsktComp->{
            bsktCompRepository.delete(selectedBsktComp);
        });

        Optional<BsktComp> deleteBsktComp = bsktCompRepository.findById(bsktCompPK);
        assertNotNull(deleteBsktComp.isPresent());

    }
}
    