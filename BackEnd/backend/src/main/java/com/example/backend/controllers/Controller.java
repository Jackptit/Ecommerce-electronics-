package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Account;
import com.example.backend.repositories.AccountRepository;

//Controller_Test
@RestController
public class Controller {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountRepository accR;

    // test
    @GetMapping("/")
    public String home() {
        String rawPassword = "thao12345";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        try {
            Account acc = accR.findByUsername("user1");
            return acc.getUsername();
        } catch (Exception e) {
            System.err.println(e);
            return e.toString();
        }

    }

    @PostMapping("/test-request")
    public ResponseEntity<String> testPostRequest() {
        return ResponseEntity.ok("POST request successful");
    }

}