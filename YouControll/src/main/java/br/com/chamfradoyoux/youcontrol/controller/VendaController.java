package br.com.chamfradoyoux.youcontrol.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.chamfradoyoux.youcontrol.model.Venda;
import br.com.chamfradoyoux.youcontrol.repository.VendaRepository;

@RestController
public class VendaController {
    
    @Autowired
    private VendaRepository vendaRepository;

    @GetMapping("/vendas")
    public List<Venda> getAllVendas(){
        return vendaRepository.findAll();
    }
}
