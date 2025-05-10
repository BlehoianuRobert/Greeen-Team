package com.unitime.unitime.controller;

import com.unitime.unitime.model.Orar;
import com.unitime.unitime.model.User;
import com.unitime.unitime.repository.OrarRepository;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orar")
public class OrarController {

    @Autowired
    private OrarRepository orarRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Orar> getAllOrar(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return orarRepository.findByUser(user);
    }

    @PostMapping
    public Orar createOrar(@RequestBody Orar orar, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        orar.setUser(user);
        return orarRepository.save(orar);
    }

    @PutMapping("/{id}")
    public Orar updateOrar(@PathVariable Long id,
                           @RequestBody Orar orarDetails,
                           Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Orar orar = orarRepository.findById(id).orElseThrow();
        if (!orar.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }

        orar.setTitlu(orarDetails.getTitlu());
        orar.setDescriere(orarDetails.getDescriere());
        orar.setLocatie(orarDetails.getLocatie());
        orar.setData(orarDetails.getData());
        orar.setOra(orarDetails.getOra());

        return orarRepository.save(orar);
    }

    @DeleteMapping("/{id}")
    public void deleteOrar(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        Orar orar = orarRepository.findById(id).orElseThrow();
        if (!orar.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized");
        }

        orarRepository.delete(orar);
    }
}
