package com.example.demoApp.controller;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.example.demoApp.dto.RegisterRequest;
//import com.example.demoApp.services.UserService;
import com.example.demoApp.services.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demoApp.model.*;
import com.example.demoApp.repository.*;
import com.example.demoApp.exception.*;

import static org.springframework.http.HttpStatus.*;

@RestController  
public class UserController {
	
	@Autowired
    UserRepository UserRepository;

    private final CustomUserService userService;

    public UserController(@Qualifier("customUserService") CustomUserService userService) {
        this.userService = userService;
    }

	
	// Get All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return (List<User>) UserRepository.findAll();
    }
    
    //Get User by Username
    @GetMapping("/user")
    public User getUserByUsername(@RequestParam("username") String username) {
        return UserRepository.findByUsername(username);
    }
//    public User getUserByEmail(@RequestParam String email) {
//    	return UserRepository.findByEmail(email);
//    }
    
    // Get User by ID
    @GetMapping("/user/{id}")
    public Optional<User> getUserById(@PathVariable(value = "id") Long Id) {
        return Optional.ofNullable(UserRepository.findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", Id)));
    }

    @PostMapping("/register")
//    @ResponseStatus(value = HttpStatus.CREATED, reason = "User Created")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest) {

        if (Objects.equals(userService.signup(registerRequest), "Email and Username is already taken"))
        {
            return new ResponseEntity<>("Email and Username is Already Taken", CONFLICT);
        }

        if (Objects.equals(userService.signup(registerRequest), "Email is already taken"))
        {
            return new ResponseEntity<>("Email is Already Taken", CONFLICT);
        }

        if (Objects.equals(userService.signup(registerRequest), "Username is already taken"))
        {
            return new ResponseEntity<>("Username is Already Taken", CONFLICT);
        }

        else
        {
            return new ResponseEntity<>("User Registration Successful",
                    CREATED);
        }

    }

    //Delete a User by ID
    @DeleteMapping("/user/{id}")
    //public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long Id) {
    public String deleteUser(@PathVariable(value = "id") Long Id) {
    	User user = UserRepository.findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", Id));
       UserRepository.delete(user);
       return "User Deleted";
       //return ResponseEntity.ok().build();
    }

    @PutMapping("/user/{username}")
    public ResponseEntity<?> editUser(@PathVariable(value = "username") String username, @RequestBody RegisterRequest registerRequest) {
    {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.edit(username, registerRequest));
    }
}
}
