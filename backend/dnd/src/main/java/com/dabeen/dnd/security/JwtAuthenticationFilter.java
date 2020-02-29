// JwtAuthenticationFilter.java
// 토큰의 유효성 검증
// 작성자 : 이은비

package com.dabeen.dnd.security;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dabeen.dnd.exception.TokenInvaildException;
import com.dabeen.dnd.model.entity.User;
import com.dabeen.dnd.repository.UserRepository;
import com.dabeen.dnd.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    @Autowired
    private UserRepository userRepository;

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

        Claims claims = jwtService.getClaims(token.substring("Bearer ".length())); // Authorization: Bearer TOKEN 형태이므로
        String role = "ROLE_" + claims.get("role").toString().toUpperCase(); // 형태를 맞추기 위해서

        //log.info("{}", claims.get("userNum").toString());
        // 만약 존재하지 않는 사용자에 대한 토큰이라면 에러 호출
        //User user = userRepository.findById(claims.get("userNum").toString())
        //                    .orElseThrow(() -> new TokenInvaildException());
        //
        // 스프링 내부에서만 사용되는 authentication
        return new UsernamePasswordAuthenticationToken(claims, null, AuthorityUtils.createAuthorityList(role));
    }
}