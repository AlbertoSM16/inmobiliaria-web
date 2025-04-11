package com.inmobiliaria.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.inmobiliaria.backend.entities.InmuebleTipo;

import jakarta.transaction.Transactional;

public interface InmuebleTipoRepository extends JpaRepository<InmuebleTipo, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM InmuebleTipo it WHERE it.inmueble.id = :inmuebleId")
    void deleteByInmuebleId(Integer inmuebleId);

    List<InmuebleTipo> findByInmueble_Id(Integer id);

}
