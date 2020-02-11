package com.dabeen.dnd.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class InvaildTokenException extends RuntimeException{
    private String message = "Invaild Token.";

    public InvaildTokenException(){
        log.error(this.message);
    }
}