package com.inmobiliaria.backend.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inmobiliaria.backend.entities.ContratoInmueble;
import com.inmobiliaria.backend.services.ContratoInmuebleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/type-contract")
public class ContratoInmuebleController {

    @Autowired
    private ContratoInmuebleService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> findByInmueble_Id(@PathVariable("id") Integer id) {
        List<ContratoInmueble> contratoOptional = service.findByInmueble_Id(id);
        if (!contratoOptional.isEmpty()) {
            return ResponseEntity.ok(contratoOptional);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "No se encontraron contratos para el inmueble con id " + id));
    }

}
