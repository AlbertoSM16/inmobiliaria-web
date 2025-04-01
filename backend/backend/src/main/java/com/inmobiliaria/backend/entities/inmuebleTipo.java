package com.inmobiliaria.backend.entities;

import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "inmueble_tipo")
public class inmuebleTipo {

    //relacion un inmueble con un tipo
    //muchos tipos a un inmueble
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    
    


    
}

