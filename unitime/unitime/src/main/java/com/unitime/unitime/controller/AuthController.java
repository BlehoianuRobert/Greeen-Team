package com.unitime.unitime.controller;

import com.unitime.unitime.dto.LoginRequest;
import com.unitime.unitime.dto.RegisterRequest;
import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.payload.UserInfoResponse;
import com.unitime.unitime.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest req) {
        ApiResponse resp = authService.register(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(@Valid @RequestBody LoginRequest req) {
        UserInfoResponse info = authService.authenticate(req);
        return ResponseEntity.ok(info);
    }
}
