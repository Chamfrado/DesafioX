package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    @Query(value = "SELECT v.id, c.nome, v.data, v.status, v.valor FROM venda v LEFT JOIN cliente c ON v.cliente_id = c.id", nativeQuery = true)
    List<Object> findAllWithClientName();

}
