// src/main/java/com/unitime/unitime/service/OrarService.java
package com.unitime.unitime.service;

import com.unitime.unitime.dto.OrarRequest;
import com.unitime.unitime.model.Orar;
import com.unitime.unitime.model.User;
import com.unitime.unitime.payload.OrarResponse;
import com.unitime.unitime.repository.OrarRepository;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class OrarService {

    private final OrarRepository orarRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrarService(OrarRepository orarRepository,
                       UserRepository userRepository) {
        this.orarRepository = orarRepository;
        this.userRepository = userRepository;
    }

    public List<Orar> list(String username) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return orarRepository.findByUser(u);
    }

    public Orar get(String username, Long id) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Orar o = orarRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orar entry not found"));
        if (!o.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        return o;
    }

    public Orar create(String username, OrarRequest req) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Orar o = new Orar();
        o.setTitlu(req.getTitlu());
        o.setDescriere(req.getDescriere());
        o.setLocatie(req.getLocatie());
        o.setData(req.getData());
        o.setOra(req.getOra());
        o.setUser(u);
        return orarRepository.save(o);
    }

    public Orar update(String username, Long id, OrarRequest req) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Orar o = orarRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orar entry not found"));
        if (!o.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        o.setTitlu(req.getTitlu());
        o.setDescriere(req.getDescriere());
        o.setLocatie(req.getLocatie());
        o.setData(req.getData());
        o.setOra(req.getOra());
        return orarRepository.save(o);
    }

    public void delete(String username, Long id) {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Orar o = orarRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orar entry not found"));
        if (!o.getUser().getId().equals(u.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        orarRepository.delete(o);
    }

    // --- DTO mapping methods ---
    public List<OrarResponse> listResponses(String username) {
        return list(username).stream()
                .map(o -> new OrarResponse(
                        o.getId(),
                        o.getTitlu(),
                        o.getDescriere(),
                        o.getLocatie(),
                        o.getData(),
                        o.getOra()
                ))
                .toList();
    }

    public OrarResponse getResponse(String username, Long id) {
        Orar o = get(username, id);
        return new OrarResponse(
                o.getId(),
                o.getTitlu(),
                o.getDescriere(),
                o.getLocatie(),
                o.getData(),
                o.getOra()
        );
    }

    public OrarResponse createResponse(String username, OrarRequest req) {
        Orar o = create(username, req);
        return new OrarResponse(
                o.getId(),
                o.getTitlu(),
                o.getDescriere(),
                o.getLocatie(),
                o.getData(),
                o.getOra()
        );
    }

    public OrarResponse updateResponse(String username, Long id, OrarRequest req) {
        Orar o = update(username, id, req);
        return new OrarResponse(
                o.getId(),
                o.getTitlu(),
                o.getDescriere(),
                o.getLocatie(),
                o.getData(),
                o.getOra()
        );
    }
}
