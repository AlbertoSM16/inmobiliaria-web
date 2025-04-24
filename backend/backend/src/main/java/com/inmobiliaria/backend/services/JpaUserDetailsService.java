package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inmobiliaria.backend.entities.Users;
import com.inmobiliaria.backend.repository.UserRepository;
@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional (readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Users> optionalUser = userRepository.findByUsuario(username);

        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException(String.format("None has %s as username", username));
        }
        Users user = optionalUser.orElseThrow();
       
        List<GrantedAuthority> authorities = List.of(
        new SimpleGrantedAuthority(user.getRoles().getName())
        );

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
    } 

}
