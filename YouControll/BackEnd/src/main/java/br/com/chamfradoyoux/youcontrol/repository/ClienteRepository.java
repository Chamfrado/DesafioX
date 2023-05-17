package br.com.chamfradoyoux.youcontrol.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import br.com.chamfradoyoux.youcontrol.model.Cliente;

import java.util.List;
import java.util.Optional;


public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findAll();

    Optional<Cliente> findById(Long id);

    void deleteById(Long id);

    default Cliente create(Cliente cliente) {
        return save(cliente);
    }

   
}
