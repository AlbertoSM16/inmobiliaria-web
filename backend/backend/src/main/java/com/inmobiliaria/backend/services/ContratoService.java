package com.inmobiliaria.backend.services;

import java.util.List;

import com.inmobiliaria.backend.entities.Contrato;

public interface ContratoService {

    List<Contrato> findAll();
}
