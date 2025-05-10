package com.unitime.unitime.controller;

import com.unitime.unitime.dto.ChangePasswordRequest;
import com.unitime.unitime.dto.UpdateProfileRequest;
import com.unitime.unitime.model.User;
import com.unitime.unitime.service.ProfileService;
import com.unitime.unitime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserService userService;

    @GetMapping
    public User getProfile(Authentication authentication) {
        String username = authentication.getName();
        return userService.findByUsername(username).orElseThrow();
    }

    @PutMapping("/update")
    public Map<String, String> updateProfile(@RequestBody UpdateProfileRequest request,
                                             Authentication authentication) {
        String username = authentication.getName();
        profileService.updateProfile(username, request);
        return Map.of("status", "success", "message", "Profile updated successfully");
    }

    @PutMapping("/change-password")
    public Map<String, String> changePassword(@RequestBody ChangePasswordRequest request,
                                              Authentication authentication) {
        String username = authentication.getName();
        boolean success = profileService.changePassword(username, request);

        if (success) {
            return Map.of("status", "success", "message", "Password changed successfully");
        } else {
            return Map.of("status", "error", "message", "Current password is incorrect");
        }
    }
}