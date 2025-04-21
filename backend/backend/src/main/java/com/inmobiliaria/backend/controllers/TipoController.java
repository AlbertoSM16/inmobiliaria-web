package com.inmobiliaria.backend.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inmobiliaria.backend.entities.Tipo;
import com.inmobiliaria.backend.services.TipoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/types")

public class TipoController {

    @Autowired
    private TipoService service;

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Tipo> optionalTypes = service.findAll();

        if (!optionalTypes.isEmpty()) {
            return ResponseEntity.ok(optionalTypes);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        List<Tipo> optionalTypes = service.findById(id);

        if (!optionalTypes.isEmpty()) {
            return ResponseEntity.ok(optionalTypes);
            
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se ha encontrado el tipo"));
    }

}
