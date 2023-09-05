package com.example.demoApp.repository;
import com.example.demoApp.model.Post;
import com.example.demoApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

//@Repository
//@NoRepositoryBean
public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findAll();

    List<Post> findByUser(User user);

   @Query("SELECT s FROM Post s JOIN s.tags t WHERE t = LOWER(:tag)")
   List<Post> retrieveByTag(@Param("tag") String tag);

}
