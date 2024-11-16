package com.example.backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.models.LoginRequest;
import com.example.backend.models.LoginResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/userInfo")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes(); // Trả về thông tin người dùng (như email, tên, hình ảnh)
    }

    @PostMapping("/auth/api/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        {
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()));
                return new LoginResponse("Login successful");
            } catch (BadCredentialsException e) {
                // Nếu xác thực thất bại
                return new LoginResponse("Invalid username or password");
            }
        }

    }
}
