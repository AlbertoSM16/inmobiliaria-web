package com.inmobiliaria.backend.services;

import java.util.List;



import com.inmobiliaria.backend.entities.InmuebleTipo;

public interface InmuebleTipoService {

    List<InmuebleTipo> findByInmuebleId(Integer inmuebleId);
}
