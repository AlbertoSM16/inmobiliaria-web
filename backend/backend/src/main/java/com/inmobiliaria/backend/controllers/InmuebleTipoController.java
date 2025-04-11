package com.inmobiliaria.backend.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.inmobiliaria.backend.entities.InmuebleTipo;
import com.inmobiliaria.backend.services.InmuebleTipoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/type-buildings")
public class InmuebleTipoController {

    @Autowired
    private InmuebleTipoService inmuebleTipoService;

    @GetMapping("/{id}")
    public ResponseEntity<?> findByInmuebleId(@PathVariable("id") Integer id) {
        List<InmuebleTipo> inmuebleTipos = inmuebleTipoService.findByInmuebleId(id);
        if (inmuebleTipos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "No se encontraron tipos para el inmueble con id " + id));
        }
        return ResponseEntity.ok(inmuebleTipos);
    }
}
