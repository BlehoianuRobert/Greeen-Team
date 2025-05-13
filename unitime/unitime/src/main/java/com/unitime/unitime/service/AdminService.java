package com.unitime.unitime.service;

import com.unitime.unitime.payload.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    public ApiResponse getDashboard() {
        return new ApiResponse("Welcome to the admin dashboard!");
    }
}
