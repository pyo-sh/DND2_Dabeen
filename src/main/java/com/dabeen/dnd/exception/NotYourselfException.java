// NotYourselfException.java
// 본인만 접근가능한 api에서, 본인이 접근하지 않은 경우
// 작성자 : 이은비
package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class NotYourselfException extends RuntimeException{
    private String message = "잘못된 접근입니다. 본인이 맞으십니까?";

    public NotYourselfException(){
        log.error(this.message);
    }
}