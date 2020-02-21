// FileSaveFailedException.java
// AWS S3에 파일 저장을 실패할 경우 발생되는 에러
// 작성자 : 이은비
package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class FileSaveFailedException extends RuntimeException {
    private String message = "파일 저장에 실패하였습니다.";

    public FileSaveFailedException() {
        log.error(this.message);
    }
}