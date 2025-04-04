package com.inmobiliaria.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inmobiliaria.backend.entities.Contrato;

public interface ContratoRepository extends JpaRepository<Contrato, Integer> {
}
