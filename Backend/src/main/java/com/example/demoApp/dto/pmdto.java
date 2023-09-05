package com.example.demoApp.dto;

import com.example.demoApp.model.PrivateMessage;
import java.util.List;

public class pmdto {
    private List<PrivateMessage> privateMessages;
    public pmdto(List<PrivateMessage> privateMessages){this.privateMessages = privateMessages;}
    public List<PrivateMessage> getPrivateMessages(){return this.privateMessages;}
    public void setPrivateMessages(List<PrivateMessage> privateMessages){this.privateMessages = privateMessages;}
}