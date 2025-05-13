// src/main/java/com/unitime/unitime/exception/GlobalExceptionHandler.java
package com.unitime.unitime.exception;

import com.unitime.unitime.payload.ApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 1) Validation errors (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.put(fe.getField(), fe.getDefaultMessage());
        }
        ApiResponse resp = new ApiResponse("Validation failed", errors);
        return ResponseEntity.badRequest().body(resp);
    }

    // 2) Service‐thrown ResponseStatusException
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiResponse> handleResponseStatus(ResponseStatusException ex) {
        ApiResponse resp = new ApiResponse(ex.getReason());
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(resp);
    }

    // 3) Fallback pentru orice altă excepție
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleAll(Exception ex) {
        // 1) log the exception
        ex.printStackTrace();

        // 2) return a real "success":false
        ApiResponse resp = new ApiResponse("An unexpected error occurred: " + ex.getMessage());
        resp.setSuccess(false);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(resp);
    }
}
