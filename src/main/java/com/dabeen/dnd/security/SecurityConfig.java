// SecurityConfig.java
// Web 보안을 설정하기 위한 클래스
// 작성자 : 이은비

package com.dabeen.dnd.security;

import com.dabeen.dnd.service.JwtService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.Filter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Value("${jwt.secret}")
    private String secret;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        Filter filter = new JwtAuthenticationFilter((authenticationManager()), jwtService());

        http.cors().disable()
            .csrf().disable() // POST Method로 정상적인(숨겨진 값 x) 값으로 받도록
            .formLogin().disable()
            .addFilter(filter)
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // jwt은 session을 사용하지 않음으로

        http.authorizeRequests()
            // 토큰 없이도 가능
            .antMatchers("/", "/api/user/login", "/api/user/find-pwd", "/api/user/find-id", "/api/user/main-page/**",
                         "/api/help/search-main-exec-loc-helps/**","/api/help/search-main-helps/**","/api/help/search-helps/**","/api/help/finish-help/**", "/api/help/*/to-receive-helps", "/api/help/*/received-helps").permitAll()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 옵션이....있구나...? POST 전에 OPTIONS을 먼저 보낸다...
            .antMatchers(HttpMethod.POST, "/api/user").permitAll()
            .antMatchers(HttpMethod.GET, "/api/user/*").permitAll() 
            .antMatchers(HttpMethod.GET, "/api/help/*").permitAll()
            .antMatchers(HttpMethod.GET, "/api/help-pic/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/help-suppl-comp/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/fqa/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/category/**").permitAll()

            // 반드시 로그인 해야
            .antMatchers("/api/pic/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/mileage-use-hist/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/bskt-comp").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/pymt/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/bskt/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/post/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/chat/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/msg/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/user/*/quests").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/help/*/no-payment-helps").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers("/api/user/supplier").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/help-suppl-comp/**").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.POST, "/api/help-pic").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/help-pic").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/help-pic/**" ).hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.POST, "/api/help").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/help").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/help/**" ).hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/user").hasAnyRole("USER", "SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/user/**" ).hasAnyRole("USER", "SUPPLER", "ADMIN")

            // 공급자만 사용 가능
            .antMatchers(HttpMethod.POST, "/api/help-suppl-comp/**").hasAnyRole("SUPPLER", "ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/help-suppl-comp/**").hasAnyRole("USER", "SUPPLER", "ADMIN")

            // 관리자만 사용 가능
            .antMatchers("/api/admin/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/api/fqa/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/fqa/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/fqa/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/api/category/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/api/category/**").hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/api/category/**").hasAnyRole("ADMIN")
            .anyRequest().denyAll();
    }   

    // passwordEncoder Bean. 패스워드 암호화를 위한 빈으로 AutoWried을 이용하여 관리한다.
    @Bean 
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtService jwtService(){
        return new JwtService(secret);
    }
}