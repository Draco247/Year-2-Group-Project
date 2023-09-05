package com.example.demoApp.services;

import com.example.demoApp.dto.Postdto;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.PostRepository;
import com.example.demoApp.repository.UserRepository;
import com.example.demoApp.security.AccountCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Service
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;
    private UserRepository userRepository;
    private AccountCredentials applicationUserService;


    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;

    }


    @Override
    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
//        Collections.sort(posts);
        return posts;
    }

    @Override
    public Postdto getAllPostsDTO() {
        List<Post> posts = postRepository.findAll();
//        Collections.sort(posts);
        return new Postdto(posts);
    }

    @Override
    public void save(Post post) {
        post.setCreatedDate(Instant.now());
//        post.setUser(user);
        postRepository.save(post);
    }


    @Override
    public Post findById(Long id) {
        return postRepository.findById(id)
                .orElse(null);
    }

    @Override
    public List<Post> findPostsByUser(String username) {
        System.out.println(userRepository.findByUsername(username));
        return postRepository.findByUser(userRepository.findByUsername(username));
    }

    @Override
    public List<Post> findByDate(String date) {
        return null;
    }

    @Override
    public User setUser(Post post, User user) {
//        post.setUser(user);
        post.setUser(user);
        return user;
    }

    @Override
    public Post updatePost(Long id, Post post, Authentication auth) {
        Post p = postRepository.findById(id).get();
        System.out.println(p);
        if (p.getPostId()!= 0)
        {
            String username = auth.getName();
            System.out.println(username);
//            p.setPostName(post.getPostName());
            p.setDescription(post.getDescription());

            if (p.getUser().getUsername().equals(username)){
                postRepository.save(p);
            }
        }
//        Optional<Post> post = postRepository.findById(id);
//        System.out.println(post);
        return post;
    }

    @Override
    public boolean deletePost(Long id, Authentication auth) {
        System.out.println(id);
        if (id!=null) {
            String username = auth.getName();
            System.out.println(username);
            Post post = postRepository.findById(id).orElse(null);
            System.out.println(post);
            if (post!=null&&post.getUser().getUsername().equals(username)){
                postRepository.delete(post);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Post> filtertags(String filter)
    {
        return postRepository.retrieveByTag(filter);
    }

}
