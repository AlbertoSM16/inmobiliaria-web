package com.inmobiliaria.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class InmuebleRequestDTO {
    
    public Integer id;
    @NotBlank
    @Size(max = 60, message = "El título no puede tener más de 60 caracteres")
    public String titulo;

    @NotBlank
    public String precio;
    @NotBlank
    public String descripcion;
    @NotBlank
    public String localidad;
    
    public String galeria_fotos;
    @NotNull(message = "La foto principal es obligatoria")
    public String foto_principal;
    
    public Integer banios;
    
    public Integer dormitorios;
    
    @NotBlank
    public String subtitulo;
    @NotNull(message = "El tipo es obligatorio")
    public Integer tipoId;
        
    @NotNull(message = "El contrato es obligatorio")
    public Integer contratoId;

}
