package com.inmobiliaria.backend.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inmobiliaria.backend.entities.Inmueble;
import com.inmobiliaria.backend.services.InmuebleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/inmuebles")
public class InmuebleController {

    @Autowired
    private InmuebleService service;

    // 🔹 Obtener todos los inmuebles
    @GetMapping
    public ResponseEntity<List<Inmueble>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    // 🔹 Buscar inmuebles por localidad y tipo de contrato (ej. /api/inmuebles/buscar?localidad=Madrid&tipoId=1)
    @GetMapping("/buscar")
    public ResponseEntity<?> buscar(
            @RequestParam String localidad,
            @RequestParam Integer tipoId) {

        List<Inmueble> resultados = service.findByLocalidadAndContratoTipo(localidad, tipoId);
        if (!resultados.isEmpty()) {
            return ResponseEntity.ok(resultados);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    // 🔹 Buscar por tipo de inmueble (ej. /api/inmuebles/tipo?tipoId=2)
    @GetMapping("/tipo")
    public ResponseEntity<?> buscarPorTipo(@RequestParam Integer tipoId) {
        List<Inmueble> inmueblesOptional = service.findByTipoInmueble(tipoId);
        if (!inmueblesOptional.isEmpty()) {
            return ResponseEntity.ok(inmueblesOptional);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    // 🔹 Obtener un inmueble por su ID (ej. /api/inmuebles/5)
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Integer id) {
        Optional<Inmueble> inmuebleOptional = service.findById(id);
        if (inmuebleOptional.isPresent()) {
            return ResponseEntity.ok(inmuebleOptional.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se encontró el inmueble con ID: " + id));
    }
}
