// JwtAuthenticationFilter.java
// 토큰의 유효성 검증
// 작성자 : 이은비

package com.dabeen.dnd.security;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dabeen.dnd.service.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private JwtService jwtService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        Authentication authentication = getAuthentication(request);

        if(authentication != null){
            // 인증정보를 불러들여 해당 권한으로 설정
            SecurityContext context = SecurityContextHolder.getContext();
            context.setAuthentication(authentication);
        }

        chain.doFilter(request, response); 
    }
    
    private Authentication getAuthentication(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        
        if(token == null)
            return null;

        Claims claims = jwtService.getClaims(token.substring("Bearer ".length()));
        // Authorization: Bearer TOKEN 형태이므로

        // 스프링 내부에서만 사용되는 authentication
        return new UsernamePasswordAuthenticationToken(claims, null);
    }
}