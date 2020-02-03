// CrudController.java
// Controller에서 기본적으로 작성해야할 메소드 지정
// 작성자 : 이은비

package com.dabeen.dnd.controller;

import com.dabeen.dnd.ifs.CrudInterface;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Component
public abstract class CrudController<Req, Res, Entity> implements CrudInterface<Req, Res>{
    @Autowired(required = false) // 필수 x
    protected BaseService<Req, Res, Entity> baseService;

    // Create 메소드
    @Override
    @PostMapping("")
    public Header<Res> create(@RequestBody Header<Req> request){
        return baseService.create(request);
    }

    // Read 메소드
    @Override
    @GetMapping("{num}")
    public Header<Res> read(@PathVariable String num){
        return baseService.read(num);
    }

    // Update 메소드
    @Override
    @PutMapping("")
    public Header<Res> update(@RequestBody Header<Req> request){
        return baseService.update(request);
    }

    // Delete 메소드
    @Override
    @DeleteMapping("{num}")
    public Header delete(@PathVariable String num){
        return baseService.delete(num);
    }
}