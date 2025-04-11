package com.inmobiliaria.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inmobiliaria.backend.entities.Contrato;
import com.inmobiliaria.backend.repository.ContratoRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ContratoServiceImpl implements ContratoService{

    private ContratoRepository contratoRepository;
    @Autowired
    public ContratoServiceImpl(ContratoRepository contratoRepository) {
        this.contratoRepository = contratoRepository;
    }
    //to obtain all types of contracts

    @Override
    @Transactional(readOnly = true)
    public List<Contrato> findAll(){

        List<Contrato> contracts = new ArrayList<>();
        this.contratoRepository.findAll().forEach(contracts::add);
        return contracts;
    }

}
