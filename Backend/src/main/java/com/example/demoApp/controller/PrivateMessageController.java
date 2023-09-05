package com.example.demoApp.controller;


import com.example.demoApp.model.PrivateMessage;
import com.example.demoApp.repository.PrivateMessageRepository;
import com.example.demoApp.services.PrivateMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/private_message")
public class PrivateMessageController {

    @Autowired
    private PrivateMessageRepository repository;
    private final PrivateMessageService privateMessageService;

    public PrivateMessageController(@Qualifier("privateMessageService")PrivateMessageService privateMessageService){
        this.privateMessageService = privateMessageService;
    }

    @GetMapping("/{id}")
    public Optional<PrivateMessage> getPrivateMessageById(@PathVariable Long id){
        return repository.findById(id);
    }

    @GetMapping("/sender/{senderId}")
    public List<PrivateMessage> getPrivateMessagesBySenderId(@PathVariable Long senderId){return repository.findBySenderId(senderId);}

    @GetMapping("/receiver/{receiverId}")
    public List<PrivateMessage> getPrivateMessagesByReceiverId(@PathVariable Long receiverId){return repository.findByReceiverId(receiverId);}

    @GetMapping("/both/{senderId, receiverId}")
    public List<PrivateMessage> getPrivateMessagesBySenderAndReceiver(@PathVariable Long senderId, Long receiverId){return repository.findBySenderIdAndReceiverId(senderId, receiverId);}

    @PostMapping("/save")
    public PrivateMessage savePrivateMessage(@RequestBody PrivateMessage privateMessage){
        privateMessage.setDate(Instant.now());
        repository.save(privateMessage);
        return privateMessage;
    }

}