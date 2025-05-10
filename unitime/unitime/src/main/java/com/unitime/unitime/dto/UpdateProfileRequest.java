package com.unitime.unitime.dto;

public class UpdateProfileRequest {
    private String newUsername;
    private String newEmail;

    public String getNewUsername() { return newUsername; }
    public void setNewUsername(String newUsername) { this.newUsername = newUsername; }

    public String getNewEmail() { return newEmail; }
    public void setNewEmail(String newEmail) { this.newEmail = newEmail; }
}