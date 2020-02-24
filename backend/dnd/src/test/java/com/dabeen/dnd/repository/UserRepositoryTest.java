// UserRepositoryTest.java
// 작성자 : 이은비
package com.dabeen.dnd.repository;

import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.repository.mapper.UserMapper;

import org.junit.Test;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.model.enumclass.Whether; 
    
public class UserRepositoryTest extends DemoApplicationTests {
    @Autowired
    private UserRepository userRepository;
  
    @Autowired 
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void create() {
        userRepository.findById(null);
        
        String userName = "이은비";
        String birthDate = "980515";
        String address = "부산시 사하구 낙동대로 486번길 25";
        String phoneNum = "010-2458-0000";
        String id = "test2";
        String pwd = "test1";
        String email = "test!@ASd.ca";
        String nickname = "Lihess";
        String itdcCont = "안녕하세요";
        Whether supplWhet = Whether.n;
        String blonSggName = "사하구";

        User user = User.builder()
                        .userName(userName)
                        .birthDate(birthDate)
                        .address(address)
                        .phoneNum(phoneNum)
                        .userId(id)
                        .pwd(passwordEncoder.encode(pwd))
                        .email(email)
                        .nickname(nickname)
                        .itdcCont(itdcCont)
                        .supplWhet(supplWhet)
                        .build();
        
        userMapper.insert(user);

        Assert.assertNotNull(userRepository.findById(user.getUserNum()));
    }

    @Test
    public void read(){
        Optional<User> user = userRepository.findById("2002160001");
        Assert.assertNotNull(user.isPresent());
    }

    @Test
    public void update(){
        Optional<User> user = userRepository.findById("200203002");

        user.ifPresent(selectorUser -> {
            selectorUser.setPwd(passwordEncoder.encode("test02"));

            userRepository.save(selectorUser);
        });
    }

    @Test
    public void delete(){
        Optional<User> user = userRepository.findById("200203002");

        Assert.assertTrue(user.isPresent()); // 유저가 존재함을 보증함.

        user.ifPresent(selectUser -> { 
           userRepository.delete(selectUser);
        });

        Optional<User> deleteUser = userRepository.findById("200203002");
        Assert.assertFalse(deleteUser.isPresent());
    }

}
    