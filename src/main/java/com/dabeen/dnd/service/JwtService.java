// JwtService.java
// Jwt 토큰 발급 및 검증을 위한 서비스
// 작성자 : 이은비

package com.dabeen.dnd.service;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtService{
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
}