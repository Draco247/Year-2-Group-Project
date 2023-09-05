package com.example.demoApp.controller;


//import com.example.demoApp.dto.CommentDto;
import com.example.demoApp.model.Comment;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.UserRepository;
import com.example.demoApp.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentService commentService;
//    private ApplicationUserService applicationUserService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
//        this.applicationUserService = applicationUserService;
    }

    @PostMapping("/comment/{id}")// adds a comment to the post with id in the link
    public ResponseEntity<?> postComment(@RequestBody Comment comment, @PathVariable Long id, Authentication auth) {
        String loggedin = auth.getName();//gets logged in user from authentication from the jwt token
        User user = userRepository.findByUsername(loggedin);
        System.out.println(user);
        System.out.println(id);
        System.out.println(comment);
        commentService.save(id,comment,user);
        System.out.println(comment);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Comment successfully added!");
    }

    @GetMapping("/comment/{id}")// gets all comments on the post with the id in the link
    public ResponseEntity<?> getComments(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(commentService.findbyPost(id));
    }

}
