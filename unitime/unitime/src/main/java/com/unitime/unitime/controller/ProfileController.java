package com.unitime.unitime.controller;

import com.unitime.unitime.dto.ChangePasswordRequest;
import com.unitime.unitime.dto.UpdateProfileRequest;
import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.payload.UserInfoResponse;
import com.unitime.unitime.service.ProfileService;
import com.unitime.unitime.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final UserService userService;

    @Autowired
    public ProfileController(ProfileService profileService,
                             UserService userService) {
        this.profileService = profileService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserInfoResponse> getProfile(Authentication auth) {
        var user = userService.findByUsername(auth.getName())
                .orElseThrow();

        var resp = UserInfoResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .jwtToken(null)
                .build();
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateProfile(
            @RequestBody UpdateProfileRequest req,
            Authentication auth) {

        profileService.updateProfile(auth.getName(), req);
        return ResponseEntity.ok(
                new ApiResponse("Profile updated successfully")
        );
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(
            @RequestBody ChangePasswordRequest req,
            Authentication auth) {

        boolean ok = profileService.changePassword(auth.getName(), req);
        if (ok) {
            return ResponseEntity.ok(
                    new ApiResponse("Password changed successfully")
            );
        } else {
            return ResponseEntity
                    .status(400)
                    .body(new ApiResponse("Current password is incorrect"));
        }
    }
}
