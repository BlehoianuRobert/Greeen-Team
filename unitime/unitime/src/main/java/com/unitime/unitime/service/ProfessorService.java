package com.unitime.unitime.service;

import com.unitime.unitime.payload.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public class ProfessorService {
    public ApiResponse getHome() {
        return new ApiResponse("Welcome, professor!");
    }
}
