package br.com.chamfradoyoux.youcontrol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import br.com.chamfradoyoux.youcontrol.model.Cliente;
import br.com.chamfradoyoux.youcontrol.repository.ClienteRepository;

@RestController
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
}