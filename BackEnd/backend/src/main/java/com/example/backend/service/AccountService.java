package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.models.Account;
import com.example.backend.repositories.AccountRepository;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public void registerUser(Account acc) throws Exception {
        // Mã hóa mật khẩu
        if (accountRepository.findByUsername(acc.getUsername()) != null) {
            throw new Exception("Username already exists");
        }
        accountRepository.save(acc);
    }

}
