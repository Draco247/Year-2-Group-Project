package com.example.demoApp.services;

import com.example.demoApp.dto.Postdto;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {


    List<Post> getAllPosts();
    Postdto getAllPostsDTO();
    void save(Post post);
    boolean deletePost(Long id, Authentication auth);
    Post findById(Long id);
    List<Post> findPostsByUser(String username);
    List<Post> findByDate(String date);
    Post updatePost(Long id, Post post, Authentication auth);

//    User setUser(Post post, Long userid);

    User setUser(Post post, User user);

    List<Post> filtertags(String filter);
}
