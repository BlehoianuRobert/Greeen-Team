package com.unitime.unitime.service;

import com.unitime.unitime.dto.NoteRequest;
import com.unitime.unitime.model.Note;
import com.unitime.unitime.model.User;
import com.unitime.unitime.payload.NoteResponse;
import com.unitime.unitime.repository.NoteRepository;
import com.unitime.unitime.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository,
                       UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    public List<Note> list(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return noteRepository.findByUser(user);
    }

    public Note get(String username, Long id) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
        if (!note.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        return note;
    }

    public Note create(String username, NoteRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Note n = new Note();
        n.setTitle(req.getTitle());
        n.setContent(req.getContent());
        n.setUser(user);
        n.setCreatedAt(LocalDateTime.now());
        n.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(n);
    }

    public Note update(String username, Long id, NoteRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Note n = noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
        if (!n.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        n.setTitle(req.getTitle());
        n.setContent(req.getContent());
        n.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(n);
    }

    public void delete(String username, Long id) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        Note n = noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
        if (!n.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        noteRepository.delete(n);
    }
    public List<NoteResponse> listResponses(String username) {
        return list(username).stream()
                .map(n -> new NoteResponse(
                        n.getId(),
                        n.getTitle(),
                        n.getContent(),
                        n.getCreatedAt(),
                        n.getUpdatedAt()
                ))
                .toList();
    }

    public NoteResponse getResponse(String username, Long id) {
        Note n = get(username, id);
        return new NoteResponse(
                n.getId(),
                n.getTitle(),
                n.getContent(),
                n.getCreatedAt(),
                n.getUpdatedAt()
        );
    }

    public NoteResponse createResponse(String username, NoteRequest req) {
        Note n = create(username, req);
        return new NoteResponse(
                n.getId(),
                n.getTitle(),
                n.getContent(),
                n.getCreatedAt(),
                n.getUpdatedAt()
        );
    }

    public NoteResponse updateResponse(String username, Long id, NoteRequest req) {
        Note n = update(username, id, req);
        return new NoteResponse(
                n.getId(),
                n.getTitle(),
                n.getContent(),
                n.getCreatedAt(),
                n.getUpdatedAt()
        );
    }
}
