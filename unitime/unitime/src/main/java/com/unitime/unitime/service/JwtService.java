package com.unitime.unitime.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.security.Key;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    private JwtParser parser;
    private Key signingKey;

    @PostConstruct
    public void init() {
        signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        parser = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build();
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationMs))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    private Jws<Claims> parse(String token) {
        return parser.parseClaimsJws(token);
    }

    public String extractUsername(String token) {
        return parse(token).getBody().getSubject();
    }

    public String extractRole(String token) {
        return parse(token).getBody().get("role", String.class);
    }

    public boolean isTokenValid(String token, String username) {
        try {
            Claims c = parse(token).getBody();
            return c.getSubject().equals(username) && c.getExpiration().after(new Date());
        } catch (JwtException e) {
            return false;
        }
    }
}
