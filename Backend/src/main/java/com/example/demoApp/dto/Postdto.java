package com.example.demoApp.dto;

import com.example.demoApp.model.Post;

import java.util.List;

public class Postdto {
    private List<Post> posts;

    public Postdto(List<Post> posts) {
        this.posts = posts;
    }

    public Postdto() {
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
