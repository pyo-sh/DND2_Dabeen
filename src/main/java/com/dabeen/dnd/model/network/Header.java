// Header.java
// response, request에서 전송될 공통 부분과 데이터를 정의하기 위한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.model.network;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Header<T>{
    /* 공통 부분 */
    // api 통신시간
    private LocalDateTime transactionTime;

    // api 응답코드
    private String resultCode;

    // api 부가 설명
    private String description;

    /* 개별 데이터 */
    private T date;
    
    public static <T> Header<T> OK(){
        return (Header<T>)Header.builder()
                                .transactionTime(LocalDateTime.now())
                                .resultCode("OK")
                                .description("OK")
                                .build();
    }

    public static <T> Header<T> OK(T data){
        return (Header<T>)Header.builder()
                                .transactionTime(LocalDateTime.now())
                                .resultCode("OK")
                                .description("OK")
                                .date(data)
                                .build();
    }

    public static <T> Header<T> ERROR(String description){
        return (Header<T>)Header.builder()
                                .transactionTime(LocalDateTime.now())
                                .resultCode("OK")
                                .description(description)
                                .build();
    }
}
