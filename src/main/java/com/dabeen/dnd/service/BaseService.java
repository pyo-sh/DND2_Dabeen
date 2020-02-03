// BaseService.jave
// 레파지토리 지정 및 Service 등록과정을 간소화하기 위한 추상 클래스
// 작성자 : 이은비

package com.dabeen.dnd.service;

import com.dabeen.dnd.ifs.CrudInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public abstract class BaseService<Req, Res, Entity> implements CrudInterface<Req, Res>{
    // 기본적으로 지정해야 할 레파지토리를 지정.
    @Autowired(required = false) // 필수 x
    protected JpaRepository<Entity, String> baseRepository;
}