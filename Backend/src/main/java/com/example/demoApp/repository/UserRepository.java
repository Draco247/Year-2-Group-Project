package com.example.demoApp.repository;
import com.example.demoApp.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Long>{
	User findByEmail(String email);

    User findByUsername(String username);

}

