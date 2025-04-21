package com.inmobiliaria.backend.services;

import java.util.List;

import com.inmobiliaria.backend.entities.ContratoInmueble;;
public interface ContratoInmuebleService {

    List<ContratoInmueble> findByInmueble_Id(Integer inmuebleId);
}
