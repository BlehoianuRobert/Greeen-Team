package com.unitime.unitime.controller;

import com.unitime.unitime.model.Task;
import com.unitime.unitime.model.User;
import com.unitime.unitime.repository.TaskRepository;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Task> getUserTasks(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return taskRepository.findByUser(user);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        task.setUser(user);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                           @RequestBody Task taskDetails,
                           Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Task task = taskRepository.findById(id).orElseThrow();
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }

        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setLabel(taskDetails.getLabel());
        task.setDueDate(taskDetails.getDueDate());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Task task = taskRepository.findById(id).orElseThrow();
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }
        taskRepository.delete(task);
    }
}
