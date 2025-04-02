package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;

import com.inmobiliaria.backend.entities.Inmueble;

import io.micrometer.common.lang.NonNull;

public interface InmuebleService {

    List<Inmueble> findAll();

    Optional<Inmueble>findById(@NonNull Integer id);

    List<Inmueble> findByLocalidadAndContratoTipo(String localidad, Integer tipoId);
    
    List<Inmueble> findByTipoInmueble(Integer tipoId);
    // Inmueble save(Inmueble inmueble);

    // void deleteById(Integer id);

    // Page<Inmueble> findAll(Pageable pageable);
    
}
