// IdExistedException.java
// 해당 아이디와 동일한 아이디가 있는 경우, 발생하는 오류
// 작성자 : 이은비

package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class IdExistedException extends RuntimeException{
    private String message = "\' ID already exists.";
    
    public IdExistedException(String id){
        this.message = "The \'" + id + this.message;
        log.error(this.message);
    }
}