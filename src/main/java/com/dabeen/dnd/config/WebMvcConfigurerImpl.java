// WebMvcConfigurer.java
// 작성자 : 이은비

package com.dabeen.dnd.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebMvcConfigurerImpl implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") //모든 요청에 대해서
                .allowedOrigins("http://localhost:3000"); // 3000포트만 허용
    }
}