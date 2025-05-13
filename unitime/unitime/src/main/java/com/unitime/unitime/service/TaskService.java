package com.unitime.unitime.service;

import com.unitime.unitime.dto.TaskRequest;
import com.unitime.unitime.model.Task;
import com.unitime.unitime.model.User;
import com.unitime.unitime.payload.TaskResponse;
import com.unitime.unitime.repository.TaskRepository;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<Task> list(String username) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return taskRepository.findByUser(u);
    }

    public Task get(String username, Long id) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Task t = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        if (!t.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        return t;
    }

    public Task create(String username, TaskRequest req) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Task t = new Task();
        t.setName(req.getName());
        t.setDescription(req.getDescription());
        t.setLabel(req.getLabel());
        t.setDueDate(req.getDueDate());
        t.setUser(u);
        return taskRepository.save(t);
    }

    public Task update(String username, Long id, TaskRequest req) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Task t = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        if (!t.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        t.setName(req.getName());
        t.setDescription(req.getDescription());
        t.setLabel(req.getLabel());
        t.setDueDate(req.getDueDate());
        return taskRepository.save(t);
    }

    public void delete(String username, Long id) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Task t = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        if (!t.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        taskRepository.delete(t);
    }

    public List<TaskResponse> listResponses(String username) {
        return list(username).stream()
                .map(t -> new TaskResponse(
                        t.getId(),
                        t.getName(),
                        t.getDescription(),
                        t.getLabel(),
                        t.getDueDate()
                ))
                .toList();
    }

    public TaskResponse getResponse(String username, Long id) {
        Task t = get(username, id);
        return new TaskResponse(
                t.getId(),
                t.getName(),
                t.getDescription(),
                t.getLabel(),
                t.getDueDate()
        );
    }

    public TaskResponse createResponse(String username, TaskRequest req) {
        Task t = create(username, req);
        return new TaskResponse(
                t.getId(),
                t.getName(),
                t.getDescription(),
                t.getLabel(),
                t.getDueDate()
        );
    }

    public TaskResponse updateResponse(String username, Long id, TaskRequest req) {
        Task t = update(username, id, req);
        return new TaskResponse(
                t.getId(),
                t.getName(),
                t.getDescription(),
                t.getLabel(),
                t.getDueDate()
        );
    }
}
