package com.example.demoApp.repository;

import com.example.demoApp.model.Comment;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);



}
