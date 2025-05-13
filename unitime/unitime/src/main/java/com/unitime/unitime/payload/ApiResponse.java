package com.unitime.unitime.payload;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {

    private String message;
    private boolean success;
    private Map<String, String> errors;

    public ApiResponse(String message) {
        this.message = message;
        this.success = true;
        this.errors = new HashMap<>();
    }

    public ApiResponse(String message, Map<String, String> errors) {
        this.message = message;
        this.success = false;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
