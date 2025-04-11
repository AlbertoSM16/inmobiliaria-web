package com.inmobiliaria.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.inmobiliaria.backend.entities.InmuebleTipo;
import com.inmobiliaria.backend.repository.InmuebleTipoRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class InmuebleTipoServiceImpl implements InmuebleTipoService {

    private InmuebleTipoRepository inmuebleTipoRepository;

    @Autowired
    public InmuebleTipoServiceImpl(InmuebleTipoRepository inmuebleTipoRepository2) {
        this.inmuebleTipoRepository = inmuebleTipoRepository2;
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleTipo> findByInmuebleId(Integer inmuebleId) {
        return this.inmuebleTipoRepository.findByInmueble_Id(inmuebleId);
    }
}
