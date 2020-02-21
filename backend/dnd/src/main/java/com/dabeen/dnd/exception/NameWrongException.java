// EmailWrongException.java
// 아이디 찾기, 비밀번호 찾기 요청에서 이메일이 잘못된 경우
// 작성자 : 이은비
package com.dabeen.dnd.exception;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class NameWrongException extends RuntimeException{
    String message = "입력하신 이름이 맞지 않습니다.";

    public NameWrongException(){
        log.error(this.message);
    }
}