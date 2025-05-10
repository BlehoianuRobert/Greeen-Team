package com.unitime.unitime.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import com.unitime.unitime.payload.ApiResponse;
import org.springframework.http.ResponseEntity;
import com.unitime.unitime.dto.LoginRequest;
import com.unitime.unitime.dto.RegisterRequest;
import com.unitime.unitime.model.User;
import com.unitime.unitime.repository.UserRepository;
import com.unitime.unitime.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.unitime.unitime.util.NgrokService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import com.unitime.unitime.security.UserDetailsImpl;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Set;
import com.unitime.unitime.payload.UserInfoResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NgrokService ngrokService;


    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }

        String role = request.getRole().toUpperCase();
        String email = request.getEmail();

        boolean isValid = switch (role) {
            case "STUDENT" -> email.endsWith("@student.unitbv.ro");
            case "PROFESSOR", "ADMIN" -> email.endsWith("@unitbv.ro");
            default -> false;
        };

        if (!isValid) {
            return ResponseEntity.badRequest().body("Invalid institutional email for role: " + role);
        }


        User user = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );
        userService.saveUser(user);

        String token = confirmationTokenService.generateToken(email, 1000L * 60 * 60); // 1 hour
        String link = ngrokService.getPublicUrl() + "/api/auth/confirm?token=" + token;

        emailService.sendEmail(email, "Confirm your UniTime Account",
                "Click the link to confirm your account: " + link);

        return ResponseEntity.ok(new ApiResponse("Registration successful. Please check your email to confirm your account."));
    }


//    @PostMapping("/login")
//    public Map<String, String> login(@RequestBody LoginRequest request) {
//        return userService.authenticate(request.getUsername(), request.getPassword())
//                .map(user -> {
//                    long duration = request.isRememberMe() ? 1000L * 60 * 60 * 24 * 7 : 1000L * 60 * 60;
//                    String token = jwtService.generateToken(user.getUsername(), user.getRole(), duration);
//                    return Map.of("status", "success", "token", token);
//                })
//                .orElse(Map.of("status", "error", "message", "Invalid credentials or account not confirmed."));
//    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword().trim()
                    )
            );
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(401).body(Map.of(
                    "status", "error",
                    "message", "Invalid credentials or account not confirmed."
            ));
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails.getUsername(), userDetails.getRole(), 1000L * 60 * 60);

        String role = userDetails.getRole();
        return ResponseEntity.ok(new UserInfoResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                role,
                token

        ));
    }

}