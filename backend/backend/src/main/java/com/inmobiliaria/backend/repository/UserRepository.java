package com.inmobiliaria.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.inmobiliaria.backend.entities.Users;

public interface UserRepository extends CrudRepository<Users, Long>{

    Page<Users>findAll(Pageable pageable);
    Optional<Users> findByUsername(String userName);
    
}
