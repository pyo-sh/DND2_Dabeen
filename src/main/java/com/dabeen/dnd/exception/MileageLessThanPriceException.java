// MileageLessThanPriceException.java
// 결제하려는 가격이 보유 마일리지보다 클 경우
// 작성자 : 이은비
package com.dabeen.dnd.exception;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class MileageLessThanPriceException extends RuntimeException{
    String message = "보유 마일리지가 부족합니다.";

    public MileageLessThanPriceException(){
        log.error(this.message);
    }
}