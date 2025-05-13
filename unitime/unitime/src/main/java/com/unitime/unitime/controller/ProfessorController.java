package com.unitime.unitime.controller;

import com.unitime.unitime.payload.ApiResponse;
import com.unitime.unitime.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professor")
public class ProfessorController {

    private final ProfessorService professorService;

    @Autowired
    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> home() {
        ApiResponse resp = professorService.getHome();
        return ResponseEntity.ok(resp);
    }
}
