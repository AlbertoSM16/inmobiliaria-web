package com.inmobiliaria.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
// import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
// import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.inmobiliaria.backend.entities.Inmueble;

public interface InmuebleRepository extends CrudRepository<Inmueble, Integer> {

        // Page<Inmueble>findAll(Pageable pageable);
        Optional<Inmueble> findById(Integer id);

        // search by contract and location
        @Query("SELECT i FROM Inmueble i " +
                        "JOIN ContratoInmueble ci ON i.id = ci.inmueble.id " +
                        "JOIN Contrato c ON c.id = ci.contrato.id " +
                        "WHERE i.localidad LIKE CONCAT('%',:localidad,'%')  AND c.id = :tipoId")
        List<Inmueble> findByLocalidadAndContratoTipo(@Param("localidad") String localidad,
                        @Param("tipoId") Integer tipoId);

        // search by contract location and type of building
        @Query("SELECT i FROM Inmueble i " +
                        "JOIN ContratoInmueble ci ON i.id = ci.inmueble.id " +
                        "JOIN Contrato c ON ci.contrato.id = c.id " +
                        "JOIN InmuebleTipo it ON i.id = it.inmueble.id " +
                        "WHERE i.localidad LIKE CONCAT('%', :localidad, '%') " +
                        "AND c.id = :contratoId " +
                        "AND it.tipoId = :tipoId")
        List<Inmueble> findByLocalidadAndContratoAndTipo(
                        @Param("localidad") String localidad,
                        @Param("contratoId") Integer contratoId,
                        @Param("tipoId") Integer tipoId);

        @Query("SELECT i FROM Inmueble i " +
                        "JOIN i.tiposInmueble it " +
                        "WHERE it.tipoId = :tipoId")
        List<Inmueble> findByTipoInmueble(@Param("tipoId") Integer tipoId);

}
