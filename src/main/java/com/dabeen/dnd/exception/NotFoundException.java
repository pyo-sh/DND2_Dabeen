// NotFoundException.java
// 엔터티가 발견되지 않을때 발생되는 오류
// 작성자 : 이은비

package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class NotFoundException extends RuntimeException{
    private String message = " 데이터를 찾을 수 없습니다.";

    public NotFoundException(String subject){
        this.message = subject + this.message;
        log.error(this.message);
    }
}
