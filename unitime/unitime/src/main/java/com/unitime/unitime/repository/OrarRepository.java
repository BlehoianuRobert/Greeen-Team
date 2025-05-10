package com.unitime.unitime.repository;

import com.unitime.unitime.model.Orar;
import com.unitime.unitime.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrarRepository extends JpaRepository<Orar, Long> {
    List<Orar> findByUser(User user);
}