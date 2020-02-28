// TokenInvaildException.java
// 토큰이 유효하지 않는 경우
// 작성자 : 이은비

package com.dabeen.dnd.exception;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class TokenInvaildException extends RuntimeException {
    String message = "유효하지 않은 토큰입니다.";

    public TokenInvaildException() {
        log.error(this.message);
    }
}