package br.com.chamfradoyoux.youcontrol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import br.com.chamfradoyoux.youcontrol.model.Cliente;
import br.com.chamfradoyoux.youcontrol.repository.ClienteRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> getAllClientes(@RequestParam(required = false) String search) {
        System.out.println(search);
        if (StringUtils.hasText(search)) {
            if (search.matches("\\d+")) {
                // Search is a CNPJ (string with only numbers)
                return clienteRepository.findByCnpjContaining(search);
            } else {
                // Search is a nome (string with only letters)
                return clienteRepository.findByNomeContainingIgnoreCaseAndAccentInsensitive(search);
            }
        }
        return clienteRepository.findAll();
    }


    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/clientes")
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente createdCliente = clienteRepository.save(cliente);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdCliente.getId()).toUri();
        return ResponseEntity.created(location).body(createdCliente);
    }

    @PutMapping("/clientes/update")
    public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(cliente.getId());
        if (clienteOptional.isPresent()) {
            Cliente existingCliente = clienteOptional.get();
            existingCliente.setNome(cliente.getNome());
            existingCliente.setCnpj(cliente.getCnpj());
            existingCliente.setEmail(cliente.getEmail());
            existingCliente.setTelefone(cliente.getTelefone());
            existingCliente.setUf(cliente.getUf());
            existingCliente.setLat(cliente.getLat());
            existingCliente.setLng(cliente.getLng());
            Cliente updatedCliente = clienteRepository.save(existingCliente);
            return ResponseEntity.ok(updatedCliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/clientes/delete/{id}")
    public ResponseEntity<String> deleteCliente(@PathVariable Long id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isPresent()) {
            clienteRepository.deleteById(id);
            return ResponseEntity.ok("deletado com sucesso!");
        } else {
            System.out.println(id);
            return ResponseEntity.notFound().build();
        }
    }

}