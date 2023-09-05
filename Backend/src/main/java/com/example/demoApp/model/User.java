package com.example.demoApp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class User {


	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long userId;

	public String getUsername() {
		return username;
	}

	@Column(unique = true)
	@NotBlank(message = "Username is required")
	private String username;

	@NotBlank(message = "Password is required")
	private String password;

	@Email
	@Column(unique = true)
	@NotEmpty(message = "Email is required")
	private String email;

	private Instant created;


	public Long getUserId() {
		return userId;
	}
//	@OneToMany(mappedBy = "user")
//	@JsonBackReference
//	private List<Post> posts;

//	@OneToMany(mappedBy = "id_author", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
//	private List<PostsAuthors> postsAuthors;
}





