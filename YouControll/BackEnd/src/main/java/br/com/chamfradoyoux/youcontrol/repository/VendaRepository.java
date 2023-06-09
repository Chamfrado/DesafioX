package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;


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

    @Query(value = "SELECT v.id, c.nome, v.data, v.status, v.valor from venda v " +
    "LEFT JOIN cliente c on v.cliente_id = c.id " +
     "WHERE lower(unaccent(c.nome)) ILIKE lower(unaccent(concat('%', :search , '%'))) " +
     "ORDER BY CASE WHEN :orderBy = 'nome' THEN nome END ASC, "+
     "CASE WHEN :orderBy = 'data' THEN data END ASC, "+
     "CASE WHEN :orderBy = 'status' THEN status END ASC, "+
     "CASE WHEN :orderBy = 'valor' THEN valor END ASC", nativeQuery = true)
    List<Object> findAllWithClientName(@Param("search") String search, @Param("orderBy") String orderBy);

}
