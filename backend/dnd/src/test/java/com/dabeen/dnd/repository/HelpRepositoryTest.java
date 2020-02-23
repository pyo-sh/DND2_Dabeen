// HelpRepositoryTest.java
// Help JPA Repository 단위 테스트를 위한 코드
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import com.dabeen.dnd.model.entity.Help;
import com.dabeen.dnd.model.enumclass.Whether;
import com.dabeen.dnd.repository.mapper.HelpMapper;

import org.junit.Assert;
import org.junit.Before;    
    
@RunWith(SpringRunner.class)
@SpringBootTest
public class HelpRepositoryTest {

    @Autowired
    private HelpRepository helpRepository;

    @Autowired
    private UserRepository userRepository; 

    @Autowired
    private HelpMapper helpMapper;


    @Before
    public void setup(){
    }
    // @Test
    // public void create() {

    //     LocalDateTime helpPstnDttm = LocalDateTime.now();
    //     String catNum = "1000";
    //     String cnsrNum = "2002130001";
    //     String title = "title";
    //     String execLoc = "서울특별시";
    //     BigDecimal price = BigDecimal.valueOf(10000000L);
    //     Integer prefSupplNum = 10;
    //     LocalDateTime prefHelpExecDttm = LocalDateTime.now();
    //     LocalDateTime helpAplyClsDttm = LocalDateTime.now();
    //     String cont = "Contents";
    //     // Whether helpAprvWhet = Whether.N; (by Trigger)
    //     String execSggName = "성북구";

        // Help help = Help.builder().helpPstnDttm(helpPstnDttm)
        //                             .catNum(catNum)
        //                             .user(userRepository.getOne(cnsrNum))
        //                             .title(title)
        //                             .execLoc(execLoc)
        //                             .price(price)
        //                             .prefSupplNum(prefSupplNum)
        //                             .prefHelpExecDttm(prefHelpExecDttm)
        //                             .helpAplyClsDttm(helpAplyClsDttm)
        //                             .cont(cont)
        //                             .execSggName(execSggName)
        //                             .build();


    //     Map<String,Object> helpMap = new HashMap<>();


    //     helpMap.put("helpPstnDttm",helpPstnDttm);
    //     helpMap.put("catNum",catNum);
    //     helpMap.put("cnsrNum", cnsrNum);
    //     helpMap.put("title",title);
    //     helpMap.put("execLoc",execLoc);
    //     helpMap.put("price",price);
    //     helpMap.put("prefSupplNum",prefSupplNum);
    //     helpMap.put("prefHelpExecDttm",prefHelpExecDttm);
    //     helpMap.put("helpAplyClsDttm",helpAplyClsDttm);
    //     helpMap.put("cont",cont);
    //     helpMap.put("execSggName",execSggName);
                            
    //     helpMapper.insert(helpMap);

    //     assertThat(helpMap.get("helpNum"),is("2002180002"));
    // }

    // @Test
    // public void read(){
    //     Optional<Help> help = helpRepository.findById("2002180001");
    //     assertThat(help.get().getHelpNum(),is("2002180001"));
    // }

    @Test
    public void update(){
        Optional<Help> help = helpRepository.findById("2002180001");

        help.ifPresent(selectorUser -> {
            selectorUser.setExecLoc("부산광역시");

            helpRepository.save(selectorUser);
        });
    }

    @Transactional
    @Test
    public void delete(){
        Optional<Help> help = helpRepository.findById("200203003");

        assertNotNull(help.isPresent());

        help.ifPresent(selectUser -> { 
           helpRepository.delete(selectUser);
        });

        Optional<Help> deleteHelp = helpRepository.findById("200203003");
        assertNotNull(deleteHelp.isPresent());

    }
}
    