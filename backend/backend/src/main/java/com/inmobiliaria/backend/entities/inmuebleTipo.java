package com.inmobiliaria.backend.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inmueble_tipo")
public class InmuebleTipo {

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    // Map the foreign key to Inmueble:
    @ManyToOne
    @JoinColumn(name = "id_inmueble", referencedColumnName = "id")
    @JsonBackReference     //i add this to not loop the json
    private Inmueble inmueble;
    
    @Column(name = "id_tipo")
    private Integer tipoId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Inmueble getInmueble() {
        return inmueble;
    }

    public void setInmueble(Inmueble inmueble) {
        this.inmueble = inmueble;
    }

    public Integer getTipoInmuebleId() {
        return tipoId;
    }

    public void setTipoInmuebleId(Integer tipoInmuebleId) {
        this.tipoId = tipoInmuebleId;
    }

   
}

