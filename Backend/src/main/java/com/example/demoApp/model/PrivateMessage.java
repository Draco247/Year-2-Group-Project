package com.example.demoApp.model;

import javax.persistence.*;
import java.time.Instant;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "private_message")
public class PrivateMessage{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @JoinColumn(name = "sender", referencedColumnName = "userId")
    private Long senderId;

    @JoinColumn(name = "receiver", referencedColumnName = "userId")
    private Long receiverId;

    @Column(name = "message")
    private String message;

    @Column(name = "date")
    private Instant date;

    public void setId(Long id){
        this.id = id;
    }

    public void setSender(Long sender){
        this.senderId = sender;
    }

    public void setReceiver(Long receiver){
        this.receiverId = receiver;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public void setDate(Instant date){
        this.date = date;
    }

    public Long getId(){
        return this.id;
    }

    public Long getSender(){
        return this.senderId;
    }

    public Long getReceiver(){
        return this.receiverId;
    }

    public String getMessage(){
        return this.message;
    }

    public Instant getDate() {
        return this.date;
    }
}