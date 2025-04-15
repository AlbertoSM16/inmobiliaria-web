package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inmobiliaria.backend.entities.ContratoInmueble;
import com.inmobiliaria.backend.repository.ContratoInmuebleRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ContratoInmuebleServiceImpl implements ContratoInmuebleService {

    private ContratoInmuebleRepository contratoInmuebleRepository;

    @Autowired
    public ContratoInmuebleServiceImpl(ContratoInmuebleRepository contratoInmuebleRepository){
        this.contratoInmuebleRepository = contratoInmuebleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratoInmueble> findByInmueble_Id(Integer inmuebleId) {
        return this.contratoInmuebleRepository.findByInmueble_Id(inmuebleId);
    }
}

   
