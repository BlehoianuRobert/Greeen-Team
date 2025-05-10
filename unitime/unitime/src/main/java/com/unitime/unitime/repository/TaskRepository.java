package com.unitime.unitime.repository;

import com.unitime.unitime.model.Task;
import com.unitime.unitime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
