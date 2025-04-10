package com.inmobiliaria.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inmobiliaria.backend.dto.InmuebleRequestDTO;
import com.inmobiliaria.backend.entities.ContratoInmueble;
import com.inmobiliaria.backend.entities.Inmueble;
import com.inmobiliaria.backend.entities.InmuebleTipo;
import com.inmobiliaria.backend.repository.ContratoInmuebleRepository;
import com.inmobiliaria.backend.repository.ContratoRepository;
import com.inmobiliaria.backend.repository.InmuebleRepository;
import com.inmobiliaria.backend.repository.InmuebleTipoRepository;

@Service
public class InmuebleServiceImpl implements InmuebleService {

    private final InmuebleRepository repository;

    @Autowired
    public InmuebleServiceImpl(InmuebleRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Inmueble save(Inmueble inmueble) {
        return repository.save(inmueble);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findAll() {
        return (List<Inmueble>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Inmueble> findById(@NonNull Integer id) {
        return repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByLocationContract(String localidad, Integer tipoId) {
        return repository.findByLocationContract(localidad, tipoId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByLocationContractType(String localidad, Integer contratoId, Integer tipoId) {
        return repository.findByLocationContractType(localidad, contratoId, tipoId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Inmueble> findByTypeContract(Integer tipoId, Integer contratoId) {
        return repository.findByTypeContract(tipoId, contratoId);
    }

    @Autowired
    private ContratoRepository contratoRepo;
    @Autowired
    private ContratoInmuebleRepository contratoInmuebleRepo;
    @Autowired
    private InmuebleTipoRepository inmuebleTipoRepo;

    @Override
    @Transactional
    public Inmueble saveFromDTO(InmuebleRequestDTO dto) {

        Inmueble inmueble = new Inmueble();
        inmueble.setTitulo(dto.titulo);
        inmueble.setPrecio(dto.precio);
        inmueble.setDescripcion(dto.descripcion);
        inmueble.setLocalidad(dto.localidad);
        inmueble.setGaleria_fotos(dto.galeria_fotos);
        inmueble.setFoto_principal(dto.foto_principal);
        inmueble.setBanios(dto.banios);
        inmueble.setDormitorios(dto.dormitorios);
        inmueble.setSubtitulo(dto.subtitulo);

        Inmueble saved = repository.save(inmueble);

        // Relación con contrato
        ContratoInmueble contratoInmueble = new ContratoInmueble();
        contratoInmueble.setInmueble(saved);
        contratoInmueble.setContrato(contratoRepo.findById(dto.contratoId).orElseThrow());
        contratoInmuebleRepo.save(contratoInmueble);

        // Relación con tipo
        InmuebleTipo tipo = new InmuebleTipo();
        tipo.setInmueble(saved);
        tipo.setTipoInmuebleId(dto.tipoId);
        inmuebleTipoRepo.save(tipo);

        return saved;
    }

    @Override
    @Transactional
    public Inmueble updateFromDTO(Integer id, InmuebleRequestDTO dto) {
        // 1. Buscar el inmueble existente
        Inmueble inmueble = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inmueble no encontrado"));

        // 2. Actualizar campos del inmueble
        inmueble.setTitulo(dto.titulo);
        inmueble.setPrecio(dto.precio);
        inmueble.setDescripcion(dto.descripcion);
        inmueble.setLocalidad(dto.localidad);
        inmueble.setGaleria_fotos(dto.galeria_fotos);
        inmueble.setFoto_principal(dto.foto_principal);
        inmueble.setBanios(dto.banios);
        inmueble.setDormitorios(dto.dormitorios);
        inmueble.setSubtitulo(dto.subtitulo);

        Inmueble updated = repository.save(inmueble);

        contratoInmuebleRepo.findByInmuebleId(id).ifPresentOrElse(
                ci -> {
                    ci.setContrato(contratoRepo.findById(dto.contratoId)
                            .orElseThrow(() -> new RuntimeException("Contrato no encontrado")));
                    contratoInmuebleRepo.save(ci);
                },
                () -> {
                    ContratoInmueble nuevo = new ContratoInmueble();
                    nuevo.setInmueble(updated);
                    nuevo.setContrato(contratoRepo.findById(dto.contratoId)
                            .orElseThrow(() -> new RuntimeException("Contrato no encontrado")));
                    contratoInmuebleRepo.save(nuevo);
                });

        inmuebleTipoRepo.deleteByInmuebleId(id);

        InmuebleTipo tipo = new InmuebleTipo();
        tipo.setInmueble(updated);
        tipo.setTipoInmuebleId(dto.tipoId);
        inmuebleTipoRepo.save(tipo);

        return updated;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {

        Inmueble inmueble = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inmueble no encontrado"));

        contratoInmuebleRepo.findByInmuebleId(id).ifPresent(contratoInmuebleRepo::delete);
        inmuebleTipoRepo.deleteByInmuebleId(id);

        repository.delete(inmueble);
    }
}
