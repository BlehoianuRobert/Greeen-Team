package com.unitime.unitime.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class ConfirmationTokenService {

    @Value("${confirmation.token.secret}")
    private String secret;

    @Value("${confirmation.token.expiration-ms}")
    private long expirationMs;

    private Key signingKey;
    private JwtParser parser;

    @PostConstruct
    public void init() {
        signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        parser = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build();
    }

    public String generateToken(String email) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationMs))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return parser.parseClaimsJws(token).getBody().getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = parser.parseClaimsJws(token).getBody();
            return !claims.getExpiration().before(new Date());
        } catch (JwtException e) {
            return false;
        }
    }
}
