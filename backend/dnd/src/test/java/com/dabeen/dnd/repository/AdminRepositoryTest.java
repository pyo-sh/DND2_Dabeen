// AdminRepositoryTest.java
// 작성자 : 이은비

package com.dabeen.dnd.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import junit.framework.Assert;

import com.dabeen.dnd.DemoApplicationTests;
import com.dabeen.dnd.repository.mapper.AdminMapper;
import com.dabeen.dnd.model.entity.Admin;
    
public class AdminRepositoryTest extends DemoApplicationTests{
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminMapper AdminMapper;

    @Test
    public void create() {
        String adminName = "이은비";
        String address = "부산시 사하구 낙동대로 486번길 25";
        String phoneNum = "010-2458-0000";
        String id = "test2";
        String pwd = "test1";
        String email = "test!@ASd.ca";
        
        Admin admin = Admin.builder()
                            .adminName(adminName)
                            .address(address)
                            .id(id)
                            .pwd(pwd)
                            .phoneNum(phoneNum)
                            .email(email)
                            .build();
        AdminMapper.insert(admin);

        Assert.assertNotNull(adminRepository.findById(admin.getAdminNum()));
    }
}
    