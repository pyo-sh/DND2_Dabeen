// JwtService.java
// Jwt 토큰 발급 및 검증을 위한 서비스
// 작성자 : 이은비

package com.dabeen.dnd.service;

import java.security.Key;

import com.dabeen.dnd.exception.TokenInvaildException;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtService{
    @Autowired
    private UserRepository userRepository;

    private Key key;

    public JwtService(String secret){
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        // 해당 비밀키를 바이트형태로 받음
    }

    // 아이디, 역할(수요자 / 공급자 / 관리자)를 claim으로 사용
    public String createToken(String userNum, String id, String nickname, String role){
        String token = Jwts.builder()
                            .claim("userNum", userNum)
                            .claim("id", id)
                            .claim("nickname", nickname)
                            .claim("role", role)
                            .signWith(key, SignatureAlgorithm.HS256)
                            .compact();
       
        return token;
    }

	public Claims getClaims(String token) {
        return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
    }
    
    public Header<?> invalidWhet(Authentication authentication){
        Claims claims = (Claims) authentication.getPrincipal();
        try {
            userRepository.findById(claims.get("userNum").toString())
                     .orElseThrow(() -> new TokenInvaildException());
        } catch (TokenInvaildException e) {
            return Header.ERROR(HttpStatus.FORBIDDEN, "description");
        }
        return null;
    }
}