// src/main/java/com/unitime/unitime/controller/TaskController.java
package com.unitime.unitime.controller;

import com.unitime.unitime.dto.TaskRequest;
import com.unitime.unitime.payload.TaskResponse;
import com.unitime.unitime.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> list(Authentication auth) {
        List<TaskResponse> dtos = taskService.listResponses(auth.getName());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getOne(@PathVariable Long id, Authentication auth) {
        TaskResponse dto = taskService.getResponse(auth.getName(), id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@Valid @RequestBody TaskRequest req,
                                               Authentication auth) {
        TaskResponse created = taskService.createResponse(auth.getName(), req);
        URI location = URI.create("/api/tasks/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody TaskRequest req,
                                               Authentication auth) {
        TaskResponse updated = taskService.updateResponse(auth.getName(), id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        taskService.delete(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
