// NotUpdateableException.java
// 수정 불가능한 속성을 수정하려고 할 경우 발생되는 오류
// 작성자 : 이은비

package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class NotUpdateableException extends RuntimeException{
    private String message = " 은 수정할 수 없습니다.";

    public NotUpdateableException(String subject){
        this.message = subject + this.message;
        log.error(this.message);
    }
}
