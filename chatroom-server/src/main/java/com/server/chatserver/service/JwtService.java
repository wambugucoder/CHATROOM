package com.server.chatserver.service;

import com.server.chatserver.security.ChatUserDetails;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;


@Service
public class JwtService {
    @Value("${secret.key}")
    private String securityKey;

    @PostConstruct
    protected void init() {
        securityKey = Base64.getEncoder().encodeToString(securityKey.getBytes());
    }
    private String CreateJwtToken(Map<String, Object> payload){
        return Jwts.builder()
                .setClaims(payload)
                .setSubject("Chat_User_Details")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ TimeUnit.HOURS.toMillis(1)))
                .signWith(SignatureAlgorithm.HS256,securityKey)
                .compact();

    }
    public String GenerateOauthToken(Authentication authentication){
        ChatUserDetails userPrincipal = (ChatUserDetails) authentication.getPrincipal();
        Map<String,Object> payload = new HashMap<>();
        payload.put("UserName",userPrincipal.getName());
        payload.put("Id",userPrincipal.getId());
        payload.put("Avatar",userPrincipal.getAvatar());
        payload.put("AuthProvider",userPrincipal.getAuthProvider());
        payload.put("CreatedAt",userPrincipal.getCreatedAt().toString());
        return CreateJwtToken(payload);

    }
}
