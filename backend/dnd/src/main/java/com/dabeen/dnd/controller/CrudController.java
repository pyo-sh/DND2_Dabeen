// CrudController.java
// Controller에서 기본적으로 작성해야할 메소드 지정
// 작성자 : 이은비

package com.dabeen.dnd.controller;

import javax.validation.Valid;


import com.dabeen.dnd.ifs.CrudInterface;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
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

    @Autowired
    protected Validator validator;

    // Create 메소드
    @Override
    @PostMapping("")
    public Header<Res> create(@RequestBody @Valid Header<Req> request){
        Req reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);

        return baseService.create(request);
    }

    // Read 메소드
    @Override
    @GetMapping("{num}") // User의 id와 헷갈려서 num으로 작성
    public Header<Res> read(@PathVariable String num){
        return baseService.read(num);
    }

    // Update 메소드
    @Override
    @PutMapping("")
    public Header<Res> update(@RequestBody @Valid Header<Req> request){
        Req reqDate = request.getData();
       
        Errors errors = new BeanPropertyBindingResult(reqDate, "event");
        validator.validate(reqDate, errors);
        
        return baseService.update(request);
    }

    // Delete 메소드
    @Override
    @DeleteMapping("{num}")
    public Header delete(@PathVariable String num){
        return baseService.delete(num);
    }
}