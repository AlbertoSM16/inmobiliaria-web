package com.inmobiliaria.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table (name = "contrato_inmueble",
uniqueConstraints = @UniqueConstraint(columnNames = "id_inmueble"))

public class contratoInmueble {

 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // FK a inmueble (único)
    @OneToOne
    @JoinColumn(name = "id_inmueble", nullable = false, unique = true)
    private inmuebles inmueble;

    // FK a contrato
    @ManyToOne
    @JoinColumn(name = "id_contrato", nullable = false)
    private contrato contrato;
}
