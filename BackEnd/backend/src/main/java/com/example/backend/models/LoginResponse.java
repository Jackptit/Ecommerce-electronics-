package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LoginResponse {
    private String message;
    private String token;

    public LoginResponse(String message) {
        this.message = message;
    }

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }
}
