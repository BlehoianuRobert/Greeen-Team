package com.unitime.unitime.service;

import com.unitime.unitime.dto.LoginRequest;
import com.unitime.unitime.dto.RegisterRequest;
import com.unitime.unitime.model.User;
import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.payload.UserInfoResponse;
import com.unitime.unitime.repository.UserRepository;
import com.unitime.unitime.util.NgrokService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ConfirmationTokenService tokenService;
    private final NgrokService ngrokService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthService(UserService userService,
                       UserRepository userRepository,
                       ConfirmationTokenService tokenService,
                       NgrokService ngrokService,
                       EmailService emailService,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.ngrokService = ngrokService;
        this.emailService = emailService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public ApiResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is already taken!");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already in use!");
        }
        String role = req.getRole().toUpperCase();
        boolean validEmail = switch (role) {
            case "STUDENT"   -> req.getEmail().endsWith("@student.unitbv.ro");
            case "PROFESSOR",
                 "ADMIN"     -> req.getEmail().endsWith("@unitbv.ro");
            default          -> false;
        };
        if (!validEmail) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid institutional email for role: " + role);
        }
        User user = new User(req.getUsername(), req.getEmail(), req.getPassword(), role);
        userService.saveUser(user);
        String token = tokenService.generateToken(req.getEmail());
        String link = ngrokService.getPublicUrl() + "/api/auth/confirm?token=" + token;
        emailService.sendEmail(req.getEmail(),
                "Confirm your UniTime Account",
                "Click here to confirm: " + link);
        return new ApiResponse("Registration successful. Please check your email to confirm your account.");
    }

    public ApiResponse confirmEmail(String token) {
        if (!tokenService.isTokenValid(token)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token");
        }
        String email = tokenService.extractEmail(token);
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setEnabled(true);
        userService.updateUser(user);
        return new ApiResponse("Email confirmed successfully! You can now log in.");
    }

    public UserInfoResponse authenticate(LoginRequest req) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            req.getUsername(),
                            req.getPassword().trim()
                    )
            );
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials or account not confirmed.");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var principal = (com.unitime.unitime.security.UserDetailsImpl) authentication.getPrincipal();
        var user = userService.findByUsername(principal.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        long duration = req.isRememberMe() ? 1000L*60*60*24*7 : 1000L*60*60;
        String jwt = jwtService.generateToken(user.getUsername(), user.getRole());

        return UserInfoResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .jwtToken(jwt)
                .build();
    }
}
