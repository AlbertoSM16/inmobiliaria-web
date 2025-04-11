package com.inmobiliaria.backend.repository;


import org.springframework.data.repository.CrudRepository;

import com.inmobiliaria.backend.entities.Tipo;

public interface TipoRespository extends CrudRepository<Tipo, Integer> {
    
    
}
