package com.inmobiliaria.backend.entities;

import static jakarta.persistence.GenerationType.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tipo")

public class tipo {

    @Id 
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @NotBlank
    private String nombre;

    // @OneToMany(mappedBy = "tipo")
    // private List<


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


}
