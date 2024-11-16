package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Account;
import com.example.backend.service.AccountService;

@RestController
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private AccountService accService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Account account) {
        try {
            accService.registerUser(account);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
