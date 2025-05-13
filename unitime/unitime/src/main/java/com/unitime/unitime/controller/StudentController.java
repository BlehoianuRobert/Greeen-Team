package com.unitime.unitime.controller;

import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> home() {
        ApiResponse resp = studentService.getHome();
        return ResponseEntity.ok(resp);
    }
}
