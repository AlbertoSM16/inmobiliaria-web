package com.inmobiliaria.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inmobiliaria.backend.entities.ContratoInmueble;

public interface ContratoInmuebleRepository extends JpaRepository<ContratoInmueble, Integer> {

    @Query("SELECT c FROM ContratoInmueble c WHERE c.inmueble.id = :inmuebleId")
    Optional<ContratoInmueble> findByInmuebleId(Integer inmuebleId);
    
    List<ContratoInmueble> findByInmueble_Id(Integer id);

}
