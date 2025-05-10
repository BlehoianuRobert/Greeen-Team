package com.unitime.unitime.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/professor")
public class ProfessorController {

    @GetMapping
    public String professorHome() {
        return "Welcome, professor!";
    }
}