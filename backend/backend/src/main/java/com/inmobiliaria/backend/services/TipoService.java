package com.inmobiliaria.backend.services;

import java.util.List;
import com.inmobiliaria.backend.entities.Tipo;

public interface TipoService {

    List<Tipo> findAll();
    List<Tipo> findById(Integer id);
    
}
