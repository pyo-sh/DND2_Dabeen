// SecurityConfig.java
// Web 보안을 설정하기 위한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.cors().and()
            .csrf().disable(); // POST Method로 정상적인(숨겨진 값 x) 값으로 받도록
        
        http.authorizeRequests()
            .antMatchers("/").permitAll(); // 일단 다 접근가능하도록 설정.
            // 추후 수정요함
    }   

    // passwordEncoder Bean. 패스워드 암호화를 위한 빈으로 AutoWried을 이용하여 관리한다.
    @Bean 
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}