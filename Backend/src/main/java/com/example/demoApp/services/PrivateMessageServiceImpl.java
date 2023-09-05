package com.example.demoApp.services;


import com.example.demoApp.model.PrivateMessage;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.PrivateMessageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service("privateMessageService")
public class PrivateMessageServiceImpl implements PrivateMessageService{

    private PrivateMessageRepository repository;
    @Override
    public List<PrivateMessage> getAllPrivateMessages() {
        return (List<PrivateMessage>) repository.findAll();
    }

    @Override
    public void save(PrivateMessage privateMessage) {
        privateMessage.setDate(Instant.now());
        repository.save(privateMessage);
    }

    @Override
    public PrivateMessage findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<PrivateMessage> findBySenderId(Long senderId) {
        return repository.findBySenderId(senderId);
    }

    @Override
    public List<PrivateMessage> findByReceiverId(Long receiverId) {
        return repository.findByReceiverId(receiverId);
    }

    @Override
    public List<PrivateMessage> findBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        return repository.findBySenderIdAndReceiverId(senderId, receiverId);
    }
}