package com.example.demoApp.repository;

import com.example.demoApp.model.PrivateMessage;
import com.example.demoApp.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrivateMessageRepository extends CrudRepository<PrivateMessage, Long>{
    List<PrivateMessage> findBySenderId(Long senderId);
    List<PrivateMessage> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
    List<PrivateMessage> findByReceiverId(Long receiverId);
    Optional<PrivateMessage> findById(Long id);
}