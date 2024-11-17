package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Account;
import com.example.backend.repositories.AccountRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

//Controller_Test
@RestController
public class Controller {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountRepository accR;

    // test
    @GetMapping("/")
    public String home(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated())
            return "User is authenticated: " + authentication.getName() + "?" + authentication;
        return "User is NOT authenticated or anonymous.";

    }

    @PostMapping("/test-request")
    public ResponseEntity<String> testPostRequest() {
        return ResponseEntity.ok("POST request successful");
    }

    @GetMapping("/test")
    public String getMethodName(HttpServletRequest request) {
        return "GET request successful";
    }

}