package com.example.demoApp.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterRequest {
    private String email;
    private String username;
    private String password;

}
