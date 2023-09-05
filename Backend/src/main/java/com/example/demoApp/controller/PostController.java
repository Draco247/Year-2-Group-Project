package com.example.demoApp.controller;

import java.util.*;
//import com.example.demoApp.dto.PostRequest;
import com.example.demoApp.model.Comment;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
//import com.example.demoApp.service.ApplicationUserService;
//import com.example.demoApp.service.PostService;
import com.example.demoApp.repository.UserRepository;
import com.example.demoApp.security.AuthenticationService;
import com.example.demoApp.services.PostService;
import com.example.demoApp.services.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private UserDetailsService service;

    //    @Autowired
    private final PostService postService;
    private final CustomUserService userService;
//    private final AuthenticationService auth;

    @Autowired
    private UserRepository userRepository;

    AuthenticationService authService;

    @Autowired
    public PostController(PostService postService, CustomUserService userService) {
        this.userService = userService;
        this.postService = postService;
    }


    @PostMapping("/newpost")
    private ResponseEntity<?> newPost(@RequestBody Post post, Authentication authentication) {
        String loggedin = authentication.getName();
        User user = userRepository.findByUsername(loggedin);
//        System.out.println(user);
//        System.out.println(user.getUserId());
//        Long userid = user.getUserId();

        if (post != null) {
            if (user != null) {
                postService.setUser(post, user);
                postService.save(post);
                System.out.println(post);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(post);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Posting unsuccesful!");
    }

    @GetMapping("/showposts")
    public ResponseEntity<?> getAllPosts() {
        System.out.println("hi");
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.getAllPostsDTO());
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.findById(id));
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deletePost(@PathVariable(value="id") Long id, HttpServletRequest req, Authentication authentication){
        if (postService.deletePost(id,authentication)){
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Post successfully deleted!");
        }
        else return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Could not delete post!");
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<?> updateBook(@PathVariable("id") Long id, @RequestBody Post post, Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.updatePost(id, post, authentication));
    }

    @GetMapping("/showposts/filterby")
    public ResponseEntity<?> filter(@RequestParam("tag") String tag)
    {
        System.out.println(postService.filtertags(tag));
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.filtertags(tag));
    }

    @GetMapping("/post/findbyuser")
    public ResponseEntity<?> findpostsbyuser(@RequestParam("user") String username)
    {
        return ResponseEntity.status(HttpStatus.OK)
                .body(postService.findPostsByUser(username));
    }
    
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchPosts(@PathVariable String keyword) {
        System.out.println("test complete");
        System.out.println(keyword);

        List<Post> posts = postService.getAllPosts();
        List<String> postNames = new ArrayList<String>();
        List<String> filteredPostNames = new ArrayList<String>();
        List<Post> filteredPosts = new ArrayList<Post>();

        //adding the post names to a list
        for (Post item : posts) {
            postNames.add(item.getPostName());
        }

        //getting the post names which contain the keyword
        for (int i = 0; i < postNames.size(); i++) {
            if ((postNames.get(i).toLowerCase(Locale.ROOT)).contains(keyword.toLowerCase(Locale.ROOT)) == true) {
                filteredPostNames.add(postNames.get(i));
            }
        }

        //checking if the filtered post names are the same as a post name,
        //then if so, adding the post data to a list
        for (Post item : posts) {
            for (int i = 0; i < filteredPostNames.size(); i++) {
                if (item.getPostName() == filteredPostNames.get(i)) {
                    filteredPosts.add(item);
                }
            }
        }

//        System.out.println("posts");
//        System.out.println(posts);
//        System.out.println("post names");
//        System.out.println(postNames);
//        System.out.println("filtered post names");
//        System.out.println(filteredPostNames);
//        System.out.println("filtered posts");
        System.out.println(filteredPosts);

        return ResponseEntity.status(HttpStatus.OK)
                .body(filteredPosts);
    }

    @GetMapping("/mostrecent")
    public ResponseEntity<?> filterByMostRecent() {
        List<Post> posts = postService.getAllPosts();
        List<Post> recentPosts = new ArrayList<Post>(posts.size());

        for (int i = 0; i < posts.size(); i ++) {
            for (int j = 1; j < (posts.size() - i); j ++) {
                if ((posts.get(j - 1)).getPostId() > (posts.get(j)).getPostId()) {
                    int tempID = j;
                    //Post temp = (posts.get(j - 1));

                    posts.set((j - 1), posts.get(j));
                    posts.set(j, (posts.get(tempID - 1)));

                }
            }
        }

        for (int i = (posts.size() - 1); i >= 0; i --) {
        //for (int i = (posts.size() - 1); i > (posts.size() - 6); i --) {
            System.out.println("i: " + i);
            System.out.println("post: " + posts.get(i));

           recentPosts.add(posts.get(i));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(recentPosts);
    }
}



