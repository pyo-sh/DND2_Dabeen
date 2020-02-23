// PasswordWrongException.java
// 비밀번호가 잘못된 경우 호출되는 오류
// 작성자 : 이은비

package com.dabeen.dnd.exception;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class PasswordWrongException extends RuntimeException{
    String message = "틀린 비밀번호입니다.";

    public PasswordWrongException(){
        log.error(this.message);
    }
}