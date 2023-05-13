package br.com.chamfradoyoux.youcontrol.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import br.com.chamfradoyoux.youcontrol.model.Cliente;

import java.util.List;


public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findAll();
}
