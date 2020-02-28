// WebMvcConfigurer.java
// 작성자 : 이은비

package com.dabeen.dnd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfigurerImpl implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry registry){
        //registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
    }
}