package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.models.Account;
import com.example.backend.repositories.AccountRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tìm người dùng trong cơ sở dữ liệu
        Account acc = accountRepository.findByUsername(username);
        if (acc == null) {
            throw new UsernameNotFoundException("User not found");
        }
        // Chuyển đổi từ User entity sang UserDetails
        return org.springframework.security.core.userdetails.User.withUsername(acc.getUsername())
                .password(acc.getPassword())
                .authorities(acc.getRole())
                .build();
    }

}
