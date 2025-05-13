package com.unitime.unitime.controller;

import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ConfirmController {

    private final AuthService authService;

    @Autowired
    public ConfirmController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/confirm")
    public ResponseEntity<ApiResponse> confirmEmail(@RequestParam("token") String token) {
        ApiResponse resp = authService.confirmEmail(token);
        return ResponseEntity.ok(resp);
    }
}
