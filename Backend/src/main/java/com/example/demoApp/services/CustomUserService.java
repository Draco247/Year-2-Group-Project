package com.example.demoApp.services;

import com.example.demoApp.dto.RegisterRequest;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Objects;

@Service
public class CustomUserService{
    private final UserRepository userRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public CustomUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String signup(RegisterRequest registerRequest) {
        User user = new User();
        if (userRepository.findByEmail(registerRequest.getEmail()) != null && userRepository.findByUsername(registerRequest.getUsername()) !=null)
        {
            return "Email and Username is already taken";
        }

        if (userRepository.findByEmail(registerRequest.getEmail()) != null)
        {
            return "Email is already taken";
        }

        if (userRepository.findByUsername(registerRequest.getUsername()) !=null)
        {
            return "Username is already taken";
        }

        else
        {
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(encoder.encode(registerRequest.getPassword()));
            user.setCreated(Instant.now());
//        user.setEnabled(false);

            userRepository.save(user);
            return "OK";
        }

    }

//    @Override
    public User getCurrentUser(HttpServletRequest request) {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return userRepository.findByUsername(username);
    }

//    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User edit(String current_username,RegisterRequest registerRequest)
    {
        User user = userRepository.findByUsername(current_username);
        if (user != null)
        {
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
//            System.out.println(registerRequest.getPassword());
            if (!Objects.equals(registerRequest.getPassword(), ""))
            {
                user.setPassword(encoder.encode(registerRequest.getPassword()));
            }
            userRepository.save(user);
//            System.out.println(user);
        }

        else
        {
            System.out.println("user is null");
        }
        System.out.println(user);
        return user;
    }

}
