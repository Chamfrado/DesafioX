package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import br.com.chamfradoyoux.youcontrol.model.Venda;

public interface VendaRepository extends JpaRepository<Venda, Long>{
 

    List<Venda> findAll();

    Optional<Venda> findById(Long id);

    void deleteById(Long id);


    default Venda create(Venda venda) {
            return save(venda);
    }

}
