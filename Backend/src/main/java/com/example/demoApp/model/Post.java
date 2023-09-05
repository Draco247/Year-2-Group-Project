package com.example.demoApp.model;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.lang.Nullable;
//

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long postId;
    @NotBlank(message = "Post Name cannot be empty or Null")
    private String postName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    @ManyToOne// link posts table to user table
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
//    @NotNull
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")// link post table to comment table
    private List<Comment> comments;

    private Instant createdDate;



    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "postId = " + postId + ", " +
                "postName = " + postName + ", " +
                "description = " + description + ", " +
                "tags = " + tags + ", " +
                "user = " + user + ", " +
                "createdDate = " + createdDate + ")";
    }
}

