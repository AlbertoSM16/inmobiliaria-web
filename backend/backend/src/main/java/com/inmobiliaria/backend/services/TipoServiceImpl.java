package com.inmobiliaria.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inmobiliaria.backend.entities.Tipo;
import com.inmobiliaria.backend.repository.TipoRespository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TipoServiceImpl implements TipoService {

    private TipoRespository tipoRepository;

    @Autowired
    public TipoServiceImpl(TipoRespository tipoRepository) {
        this.tipoRepository = tipoRepository;
    }

    //to obtain all types of buildings
    @Override
    @Transactional(readOnly = true)
    public List<Tipo> findAll(){
        List<Tipo> types = new ArrayList<>();
        this.tipoRepository.findAll().forEach(types::add);
        return types;
    }
    
}
