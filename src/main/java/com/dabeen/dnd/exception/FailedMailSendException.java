// FailMailSendException.jav
// 메일 전송에 실패할 경우 발생되는 에러
// 작성자 : 이은비

package com.dabeen.dnd.exception;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class FailedMailSendException extends RuntimeException {
    String message = "메일 전송에 실패하였습니다.";

    public FailedMailSendException() {
        log.error(this.message);
    }
}
