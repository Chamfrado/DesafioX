package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import br.com.chamfradoyoux.youcontrol.model.Venda;

public interface VendaRepository extends JpaRepository<Venda, Long>{
    List<Venda> findAll();
}
