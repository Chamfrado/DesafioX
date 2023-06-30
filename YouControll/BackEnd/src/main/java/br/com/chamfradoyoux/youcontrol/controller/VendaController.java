package br.com.chamfradoyoux.youcontrol.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import br.com.chamfradoyoux.youcontrol.model.Venda;
import br.com.chamfradoyoux.youcontrol.repository.VendaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VendaController {
    
    @Autowired
    private VendaRepository vendaRepository;

    @GetMapping("/vendas")
    public List<Object> find(@RequestParam(required = false) String search){
        return vendaRepository.findAllWithClientName(search);
    }

    @GetMapping("/vendas/{id}")
    public ResponseEntity<Venda> getVendaById(@PathVariable Long id){
        Optional<Venda> vendaOptional = vendaRepository.findById(id);
        if(vendaOptional.isPresent()){
            Venda venda = vendaOptional.get();
            return ResponseEntity.ok(venda);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/vendas/add")
    public ResponseEntity<Venda> addVenda(@RequestBody Venda venda){
        Venda createdVenda = vendaRepository.create(venda);
        return ResponseEntity.ok(createdVenda);
    }

    @PutMapping("/vendas/update")
    public ResponseEntity<Venda> updateVenda(@RequestBody Venda venda){
        Optional<Venda> vendaOptional = vendaRepository.findById(venda.getId());
        if(vendaOptional.isPresent()){
            Venda existingVenda = vendaOptional.get();
            existingVenda.setData(venda.getData());
            existingVenda.setStatus(venda.getStatus());
            existingVenda.setValor(venda.getValor());
            existingVenda.setclienteId(venda.getclienteId());
            Venda updatedVenda = vendaRepository.save(existingVenda);
            return ResponseEntity.ok(updatedVenda);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
