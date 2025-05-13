package com.unitime.unitime.controller;

import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> dashboard() {
        ApiResponse resp = adminService.getDashboard();
        return ResponseEntity.ok(resp);
    }
}
