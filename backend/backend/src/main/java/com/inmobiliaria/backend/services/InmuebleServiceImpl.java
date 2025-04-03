package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inmobiliaria.backend.entities.Inmueble;
import com.inmobiliaria.backend.repository.InmuebleRepository;

@Service
public class InmuebleServiceImpl implements InmuebleService {
    
    private final InmuebleRepository repository;

    @Autowired
    public InmuebleServiceImpl(InmuebleRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findAll() {
        return (List<Inmueble>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Inmueble> findById(@NonNull Integer id) {
        return repository.findById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByLocationContract(String localidad, Integer tipoId) {
        return repository.findByLocationContract(localidad, tipoId);
    }
    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByLocationContractType(String localidad, Integer contratoId, Integer tipoId) {
        return repository.findByLocationContractType(localidad, contratoId, tipoId);
    }


    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByTypeContract(Integer tipoId, Integer contratoId){
        return repository.findByTypeContract(tipoId, contratoId);
    }
}


