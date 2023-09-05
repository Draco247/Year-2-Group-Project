package com.example.demoApp.services;

//import com.example.demoApp.dto.CommentDto;
import com.example.demoApp.model.Comment;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CommentService {
    void save(Long id, Comment comment, User user);
    List<Comment> findbyPost(Long id);
}
