package com.unitime.unitime.service;

import com.unitime.unitime.dto.ChangePasswordRequest;
import com.unitime.unitime.dto.UpdateProfileRequest;
import com.unitime.unitime.model.User;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ProfileService(UserRepository userRepository,
                          BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void updateProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));

        String newUsername = request.getNewUsername();
        if (newUsername != null && !newUsername.isBlank() &&
                !newUsername.equals(user.getUsername())) {

            if (userRepository.existsByUsername(newUsername)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Username '" + newUsername + "' is already taken"
                );
            }
            user.setUsername(newUsername);
        }

        String newEmail = request.getNewEmail();
        if (newEmail != null && !newEmail.isBlank() &&
                !newEmail.equals(user.getEmail())) {

            if (userRepository.existsByEmail(newEmail)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Email '" + newEmail + "' is already in use"
                );
            }
            user.setEmail(newEmail);
        }

        userRepository.save(user);
    }

    public boolean changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return true;
    }
}
