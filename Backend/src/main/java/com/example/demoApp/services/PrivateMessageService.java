package com.example.demoApp.services;

import com.example.demoApp.model.User;
import com.example.demoApp.repository.PrivateMessageRepository;
import com.example.demoApp.model.PrivateMessage;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("privateMessageService")
public interface PrivateMessageService {
    List<PrivateMessage> getAllPrivateMessages();
    void save(PrivateMessage privateMessage);
    PrivateMessage findById(Long id);
    List<PrivateMessage> findBySenderId(Long senderId);
    List<PrivateMessage> findByReceiverId(Long receiverId);
    List<PrivateMessage> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
}