package com.unitime.unitime.controller;

import com.unitime.unitime.model.User;
import com.unitime.unitime.service.ConfirmationTokenService;
import com.unitime.unitime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class ConfirmController {

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private UserService userService;

    @GetMapping("/confirm")
    public Map<String, String> confirmEmail(@RequestParam("token") String token) {
        if (!confirmationTokenService.isTokenValid(token)) {
            return Map.of("status", "error", "message", "Invalid or expired token");
        }

        String email = confirmationTokenService.extractEmail(token);

        User user = userService.findByEmail(email).orElseThrow();
        user.setEnabled(true);
        userService.updateUser(user);

        return Map.of("status", "success", "message", "Email confirmed successfully! You can now log in.");
    }

}