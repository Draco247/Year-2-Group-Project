package com.example.demoApp.security;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//import com.example.demoApp.model.Role;
import com.example.demoApp.model.User;
import com.example.demoApp.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  private UserRepository repository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    { 
      User currentUser = repository.findByUsername(username);
      
      if (currentUser!=null) {
    	  System.out.println(currentUser.getEmail());
      
    	  List<GrantedAuthority> authorities = new ArrayList<>();
      
    	  UserDetails user = new org.springframework.security.core
              .userdetails.User(username, currentUser.getPassword()
              , true, true, true, true, 
              authorities);
          return user;
      }else {
    	  throw new UsernameNotFoundException("User not authorized.");
      }
    }

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
//    {
//        User currentUser = repository.findByEmail(email);
//
//        if (currentUser!=null) {
//            System.out.println(currentUser.getEmail());
//
//            List<GrantedAuthority> authorities = new ArrayList<>();
////    	  Iterator<Role> setIterator= currentUser.getRoles().iterator();
////    	  while (setIterator.hasNext())
////			authorities.add(new SimpleGrantedAuthority(setIterator.next().getRole()));
//
//
//            UserDetails user = new org.springframework.security.core
//                    .userdetails.User(email, currentUser.getPassword()
//                    , true, true, true, true,
//                    authorities);
//            return user;
//        }else {
//            throw new UsernameNotFoundException("User not authorized.");
//        }
//    }
    
}
