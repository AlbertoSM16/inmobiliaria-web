package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

import com.inmobiliaria.backend.dto.InmuebleRequestDTO;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;

import com.inmobiliaria.backend.entities.Inmueble;

import io.micrometer.common.lang.NonNull;

public interface InmuebleService {

    List<Inmueble> findAll();

    Optional<Inmueble>findById(@NonNull Integer id);

    //List<Inmueble> findByLocationContract(String localidad, Integer tipoId);
    
    List<Inmueble> findByLocationContractType(String localidad,Integer contratoId,Integer tipoId);
    
    //List<Inmueble> findByTypeContract(Integer tipoId, Integer contratoId);

    Inmueble save(Inmueble inmueble);

    Inmueble saveFromDTO(InmuebleRequestDTO dto);
    
    Inmueble updateFromDTO(Integer id, InmuebleRequestDTO dto);
    
    void deleteById(Integer id);


    // Page<Inmueble> findAll(Pageable pageable);
    
}
