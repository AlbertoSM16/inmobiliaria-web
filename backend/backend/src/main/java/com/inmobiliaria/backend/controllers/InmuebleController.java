package com.inmobiliaria.backend.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.inmobiliaria.backend.dto.InmuebleRequestDTO;
import com.inmobiliaria.backend.entities.Inmueble;
import com.inmobiliaria.backend.services.InmuebleService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/inmuebles")
public class InmuebleController {

    @Autowired
    private InmuebleService service;

    @GetMapping
    public ResponseEntity<List<Inmueble>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Integer id) {
        Optional<Inmueble> inmuebleOptional = service.findById(id);
        if (inmuebleOptional.isPresent()) {
            return ResponseEntity.ok(inmuebleOptional.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se encontró el inmueble con ID: " + id));
    }

    // searching by location and contract
    @GetMapping("/search")
    public ResponseEntity<?> searchByLocationContract(
            @RequestParam String localidad,
            @RequestParam Integer tipoId) {

        List<Inmueble> resultados = service.findByLocationContract(localidad, tipoId);
        if (!resultados.isEmpty()) {
            return ResponseEntity.ok(resultados);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    // search by contract and location and type
    @GetMapping("/all")
    public ResponseEntity<?> searchByLocationTypeContract(@RequestParam String localidad, @RequestParam Integer tipoId,
            @RequestParam Integer contratoId) {
        List<Inmueble> inmueblesOptional = service.findByLocationContractType(localidad, contratoId, tipoId);
        if (!inmueblesOptional.isEmpty()) {
            return ResponseEntity.ok(inmueblesOptional);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    // searching by contract and type
    @GetMapping("/type")
    public ResponseEntity<?> searchByTypeContract(@RequestParam Integer tipoId, @RequestParam Integer contratoId) {
        List<Inmueble> inmueblesOptional = service.findByTypeContract(tipoId, contratoId);
        if (!inmueblesOptional.isEmpty()) {
            return ResponseEntity.ok(inmueblesOptional);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody InmuebleRequestDTO dto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(err -> errores.put(err.getField(), err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errores);
        }
        Inmueble nuevo = service.saveFromDTO(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Valid @RequestBody InmuebleRequestDTO dto,
            BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(err -> errores.put(err.getField(), err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errores);
        }

        Inmueble updated = service.updateFromDTO(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

}
