// NotAstUserException.java
// 승인되지 않은 사용자를 평가하려고 할때 발생되는 오류
// 작성자 : 이은비
package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class NotAstUserException extends RuntimeException{
    private String message = "승인되지 않은 사용자입니다.";

    public NotAstUserException(){
        log.error(this.message);
    }
}