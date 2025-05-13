package com.unitime.unitime.controller;

import com.unitime.unitime.dto.OrarRequest;
import com.unitime.unitime.payload.OrarResponse;
import com.unitime.unitime.service.OrarService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/orar")
public class OrarController {

    private final OrarService orarService;

    @Autowired
    public OrarController(OrarService orarService) {
        this.orarService = orarService;
    }

    @GetMapping
    public ResponseEntity<List<OrarResponse>> list(Authentication auth) {
        List<OrarResponse> dtos = orarService.listResponses(auth.getName());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrarResponse> getOne(@PathVariable Long id, Authentication auth) {
        OrarResponse dto = orarService.getResponse(auth.getName(), id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<OrarResponse> create(@Valid @RequestBody OrarRequest req,
                                               Authentication auth) {
        OrarResponse created = orarService.createResponse(auth.getName(), req);
        URI location = URI.create("/api/orar/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrarResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody OrarRequest req,
                                               Authentication auth) {
        OrarResponse updated = orarService.updateResponse(auth.getName(), id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        orarService.delete(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
