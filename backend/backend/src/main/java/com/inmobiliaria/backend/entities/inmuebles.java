package com.inmobiliaria.backend.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inmuebles")

public class inmuebles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 60)
    private String titulo;

    @Column(nullable = false, length = 30)
    private String precio;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, length = 45)
    private String localidad;

    @Column(columnDefinition = "TEXT")
    private String galeriaFoto;

    @Column(nullable = false, length = 250)
    private String fotoPrincipal;

    private Integer banios;

    private Integer dormitorios;

    @Column(length = 100)
    private String subtitulo;

    @OneToOne(mappedBy = "inmueble")
    private inmuebles contratoInmueble;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getGaleria_fotos() {
        return galeriaFoto;
    }

    public void setGaleria_fotos(String galeria_fotos) {
        this.galeriaFoto = galeria_fotos;
    }

    public String getFoto_principal() {
        return fotoPrincipal;
    }

    public void setFoto_principal(String foto_principal) {
        this.fotoPrincipal = foto_principal;
    }

    public int getBanios() {
        return banios;
    }

    public void setBanios(int banios) {
        this.banios = banios;
    }

    public int getDormitorios() {
        return dormitorios;
    }

    public void setDormitorios(int dormitorios) {
        this.dormitorios = dormitorios;
    }

    public String getSubtitulo() {
        return subtitulo;
    }

    public void setSubtitulo(String subtitulo) {
        this.subtitulo = subtitulo;
    }
    

}   
