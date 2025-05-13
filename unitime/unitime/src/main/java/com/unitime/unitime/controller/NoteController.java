// src/main/java/com/unitime/unitime/controller/NoteController.java
package com.unitime.unitime.controller;

import com.unitime.unitime.dto.NoteRequest;
import com.unitime.unitime.payload.NoteResponse;
import com.unitime.unitime.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteResponse>> list(Authentication auth) {
        List<NoteResponse> dtos = noteService.listResponses(auth.getName());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getOne(@PathVariable Long id, Authentication auth) {
        NoteResponse dto = noteService.getResponse(auth.getName(), id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<NoteResponse> create(@Valid @RequestBody NoteRequest req,
                                               Authentication auth) {
        NoteResponse created = noteService.createResponse(auth.getName(), req);
        URI location = URI.create("/api/notes/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody NoteRequest req,
                                               Authentication auth) {
        NoteResponse updated = noteService.updateResponse(auth.getName(), id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        noteService.delete(auth.getName(), id);
        return ResponseEntity.noContent().build();
    }
}
