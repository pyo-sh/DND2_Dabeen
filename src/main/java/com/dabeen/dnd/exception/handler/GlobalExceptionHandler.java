// GlobalExceptionHandler.java
// 에러를 전역적으로 처리하기 위한 handler
// 작성자 : 이은비 

package com.dabeen.dnd.exception.handler;

import com.dabeen.dnd.model.network.Header;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import java.sql.SQLIntegrityConstraintViolationException;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import com.dabeen.dnd.exception.AlreadyExistedException;
import com.dabeen.dnd.exception.EmailWrongException;
import com.dabeen.dnd.exception.FailedMailSendException;
import com.dabeen.dnd.exception.FileSaveFailedException;
import com.dabeen.dnd.exception.MileageLessThanPriceException;
import com.dabeen.dnd.exception.NameWrongException;
import com.dabeen.dnd.exception.NotAstUserException;
import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.exception.NotUpdateableException;
import com.dabeen.dnd.exception.NotYourselfException;
import com.dabeen.dnd.exception.PasswordWrongException;
import com.dabeen.dnd.exception.TokenInvaildException;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    // 해당 엔터티를 찾을 수 없는 경우 에러 처리
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Header<?> handlerNotFoundException(NotFoundException ex) {
        return Header.ERROR(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 사용자, 관리자 생성 시 해당 아이디가 이미 존재하는 경우 발생되는 에러 처리    
    @ExceptionHandler(AlreadyExistedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerIdExistedException(AlreadyExistedException ex){
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 입력된 이름 틀린 경우 발생되는 에러 처리 
    @ExceptionHandler(NameWrongException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerEmailWrongException(NameWrongException ex){
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 입력된 비밀번호가 틀린 경우 발생되는 에러 처리 
    @ExceptionHandler(PasswordWrongException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerPasswordWrongException(PasswordWrongException ex){
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 입력된 이메일 틀린 경우 발생되는 에러 처리 
    @ExceptionHandler(EmailWrongException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerEmailWrongException(EmailWrongException ex){
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 수정 불가한 속성을 수정하려고 할 경우 발생되는 에러 처리
    @ExceptionHandler(NotUpdateableException.class)
    @ResponseStatus(HttpStatus.NOT_MODIFIED)
    public Header<?> handlerNotUpdateException(NotUpdateableException ex) {
        return Header.ERROR(HttpStatus.NOT_MODIFIED, ex.getMessage());
    }

    // Min, Max 등의 @Valid 에러 처리함수
    // TransactionSystemException 안에 해당 에러가 발생하는 형태이므로 TransactionSystemException를 받아서 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerVaildException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldError().getDefaultMessage();
        String subject = ex.getBindingResult().getFieldError().getField().substring(5);
        
        return Header.ERROR(HttpStatus.BAD_REQUEST, subject + " " + message);
    }

    // 쿼리문을 이용한 create 시, 에러 처리
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerCreateException(SQLIntegrityConstraintViolationException ex){
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // Enumclass를 사용한 변수에서 enum 외의 값을 전달받은 경우
    @ExceptionHandler(InvalidFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerEnumInvaildFormatException(InvalidFormatException ex){
        // 에러메세지의 형식을 맞추기 위해
        String subject = ex.getTargetType().getSimpleName();
        subject = subject.substring(0, 1).toLowerCase() + subject.substring(1);
        
        String message = subject + "의 값이 사전에 정의된 값들 중 하나가 아닙니다.";
        
        return Header.ERROR(HttpStatus.BAD_REQUEST, message);
    }

    // 보유 마일리지가 결제하려는 금액보다 작을 경우
    @ExceptionHandler(MileageLessThanPriceException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerMileageLessThanPriceException(MileageLessThanPriceException ex) {
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 승인되지 않은 사용자를 평가하려고 할때
    @ExceptionHandler(NotAstUserException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Header<?> handlerNotAstUserException(NotAstUserException ex) {
        return Header.ERROR(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // 메일 전송에 실패할 경우 발생되는 에러 처리
    @ExceptionHandler(FailedMailSendException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Header<?> handlerFailedMailSendException(FailedMailSendException ex) {
        return Header.ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    // 파일 저장에 실패할 경우 발생되는 에러 처리
    @ExceptionHandler(FileSaveFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Header<?> handlerFileSaveFailedException(FileSaveFailedException ex) {
        return Header.ERROR(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    // 본인만 접근 가능한 api에서 본인이 접근하지 않은 경우
    @ExceptionHandler(NotYourselfException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Header<?> handlerNotYourselfException(NotYourselfException ex) {
        return Header.ERROR(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    // 본인만 접근 가능한 api에서 본인이 접근하지 않은 경우
    @ExceptionHandler(TokenInvaildException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Header<?> handlerTokenInvaildException(TokenInvaildException ex) {
        return Header.ERROR(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    // 그 외의 에러처리. 에러사항이 다 노출되는 것은 보안 상 좋지 않으므로.
    //@ExceptionHandler(RuntimeException.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    //public Header<?> handleRuntimeException(RuntimeException ex) {
    //    log.error("서버오류 : {}", ex.getMessage(), ex);
    //    return Header.ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 서버 오류가 발생하였습니다");
    //}
}