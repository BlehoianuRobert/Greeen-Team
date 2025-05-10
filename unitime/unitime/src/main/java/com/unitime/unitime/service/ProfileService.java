package com.unitime.unitime.service;

import com.unitime.unitime.dto.ChangePasswordRequest;
import com.unitime.unitime.dto.UpdateProfileRequest;
import com.unitime.unitime.model.User;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void updateProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow();

        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()) {
            user.setUsername(request.getNewUsername());
        }
        if (request.getNewEmail() != null && !request.getNewEmail().isBlank()) {
            user.setEmail(request.getNewEmail());
        }

        userRepository.save(user);
    }

    public boolean changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return true;
    }
}