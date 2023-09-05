package com.example.demoApp.services;

//import com.example.demoApp.dto.CommentDto;
import com.example.demoApp.model.Comment;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.CommentRepository;
import com.example.demoApp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private PostService postService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,PostService postService) {
        this.commentRepository = commentRepository;
        this.postService = postService;
    }

    @Override
    public void save(Long id, Comment comment, User user) {
        Post post = postService.findById(id);
        comment.setCreatedDate(Instant.now());
        comment.setPost(post);
        comment.setUser(user);
        commentRepository.save(comment);
    }

    @Override
    public List<Comment> findbyPost(Long postId)
    {
        Post post = postService.findById(postId);
        return commentRepository.findByPost(post);
    }

}