package com.inmobiliaria.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.inmobiliaria.backend.dto.InmuebleRequestDTO;
import com.inmobiliaria.backend.entities.Inmueble;
import com.inmobiliaria.backend.services.InmuebleService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/inmuebles")
public class InmuebleController {

    @Value("${uploads.folder}")
    private String uploadsFolder;
    
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

    @GetMapping("/page")
    public ResponseEntity<Page<Inmueble>> findAllPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Inmueble> inmuebles = service.findAll(pageable);
        return ResponseEntity.ok(inmuebles);

    }

    // searching by location and contract
    // @GetMapping("/search")
    // public ResponseEntity<?> searchByLocationContract(
    // @RequestParam String localidad,
    // @RequestParam Integer tipoId) {

    // List<Inmueble> resultados = service.findByLocationContract(localidad,
    // tipoId);
    // if (!resultados.isEmpty()) {
    // return ResponseEntity.ok(resultados);
    // }

    // return ResponseEntity.status(HttpStatus.NOT_FOUND)
    // .body(Collections.singletonMap("Error", "No se han encontrado resultados"));
    // }

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

    private String saveFile(MultipartFile file) throws IOException {
        // Usamos la ruta que viene de application.properties
        String folder = System.getProperty("user.dir") + "/" + uploadsFolder;
        File uploadDir = new File(folder);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
    
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String filePath = folder + fileName;
        file.transferTo(new File(filePath));
    
        return "/" + uploadsFolder + fileName;
    }
    
    
    
    // create inmueble with the differents foreign keys

    @PostMapping
    public ResponseEntity<?> create(
            @RequestParam("titulo") String titulo,
            @RequestParam("precio") String precio,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("localidad") String localidad,
            @RequestParam("banios") Integer banios,
            @RequestParam("dormitorios") Integer dormitorios,
            @RequestParam("area") Integer area,
            @RequestParam("subtitulo") String subtitulo,
            @RequestParam("tipoId") Integer tipoId,
            @RequestParam("contratoId") Integer contratoId,
            @RequestParam("fotoPrincipal") MultipartFile fotoPrincipal,
            @RequestParam(value = "galeriaFotos", required = false) List<MultipartFile> galeriaFotos) {
        try {
            // 1. Guardar la foto principal
            String fotoPrincipalPath = saveFile(fotoPrincipal);
            // 2. Guardar las fotos de la galería (pueden ser varias)
            StringBuilder galeriaPaths = new StringBuilder();
            if (galeriaFotos != null) {
                for (MultipartFile foto : galeriaFotos) {
                    String path = saveFile(foto);
                    galeriaPaths.append(path).append(",");
                }
                // Quitar última coma
                if (galeriaPaths.length() > 0) {
                    galeriaPaths.setLength(galeriaPaths.length() - 1);
                }
            }
            InmuebleRequestDTO dto = new InmuebleRequestDTO();
            dto.titulo = titulo;
            dto.precio = precio;
            dto.descripcion = descripcion;
            dto.localidad = localidad;
            dto.banios = banios;
            dto.area = area;
            dto.dormitorios = dormitorios;
            dto.subtitulo = subtitulo;
            dto.tipoId = tipoId;
            dto.contratoId = contratoId;
            dto.foto_principal = fotoPrincipalPath;
            dto.galeria_fotos = galeriaPaths.toString();

            Inmueble nuevo = service.saveFromDTO(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error al crear el inmueble: " + e.getMessage()));
        }
    }

    // edit building and fk
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

    // delete building and fk
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
