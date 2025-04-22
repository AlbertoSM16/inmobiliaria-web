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

import com.inmobiliaria.backend.entities.Contrato;
import com.inmobiliaria.backend.services.ContratoService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/contracts")
public class ContratoController {
    @Autowired
    private ContratoService service;

    @GetMapping
    public  ResponseEntity<?>findAll(){
        
        List<Contrato> optionalsContracts = service.findAll();
        if(!optionalsContracts.isEmpty()){
            return ResponseEntity.ok(optionalsContracts);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Collections.singletonMap("Error","No se han encontrado tipos de contratos"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id){

        List<Contrato> optionalContract = service.findById(id);
        if(!optionalContract.isEmpty()){
            return ResponseEntity.ok(optionalContract);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Collections.singletonMap("Error","No se ha encontrado el contrato"));
    }

    
}
