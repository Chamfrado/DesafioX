package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import br.com.chamfradoyoux.youcontrol.model.Cliente;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByCnpjContaining(String cnpj);

    @Query(value = "SELECT * FROM cliente WHERE lower(unaccent(nome)) ILIKE lower(unaccent(concat('%', :search, '%')))", nativeQuery = true)
    List<Cliente> findByNomeContainingIgnoreCaseAndAccentInsensitive(@Param("search") String search);

    List<Cliente> findAll();

    Optional<Cliente> findById(Long id);

    void deleteById(Long id);

    default Cliente create(Cliente cliente) {
        return save(cliente);
    }

}
