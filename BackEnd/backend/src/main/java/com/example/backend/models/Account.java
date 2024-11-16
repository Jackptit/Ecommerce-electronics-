package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tbltaikhoan")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "tendangnhap")
    private String username;
    @Column(name = "matkhau")
    private String password;
    @Column(name = "chuc_vu")
    private String role;
    // @OneToOne(mappedBy = "account")
    // private Member member;

    public Account() {
    }

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
