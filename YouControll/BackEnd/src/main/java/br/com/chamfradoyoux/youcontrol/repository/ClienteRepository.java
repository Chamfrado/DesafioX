package br.com.chamfradoyoux.youcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import br.com.chamfradoyoux.youcontrol.model.Cliente;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query(value = "SELECT * FROM cliente WHERE cnpj LIKE %:cnpj% ORDER BY CASE WHEN :orderBy = 'nome' THEN nome END ASC, CASE WHEN :orderBy = 'cnpj' THEN cnpj END ASC, CASE WHEN :orderBy = 'telefone' THEN telefone END ASC, CASE WHEN :orderBy = 'email' THEN email END ASC", nativeQuery = true)
    List<Cliente> findByCnpjContaining(@Param("cnpj") String cnpj, @Param("orderBy") String orderBy);

    @Query(value = "SELECT * FROM cliente WHERE lower(unaccent(nome)) ILIKE lower(unaccent(concat('%', :search, '%'))) ORDER BY CASE WHEN :orderBy = 'nome' THEN nome END ASC, CASE WHEN :orderBy = 'cnpj' THEN cnpj END ASC, CASE WHEN :orderBy = 'telefone' THEN telefone END ASC, CASE WHEN :orderBy = 'email' THEN email END ASC", nativeQuery = true)
    List<Cliente> findByNomeContainingIgnoreCaseAndAccentInsensitive(
            @Param("search") String search,
            @Param("orderBy") String orderBy
    );

     @Query(value = "SELECT * FROM cliente ORDER BY CASE WHEN :orderBy = 'nome' THEN nome END ASC, CASE WHEN :orderBy = 'cnpj' THEN cnpj END ASC, CASE WHEN :orderBy = 'telefone' THEN telefone END ASC, CASE WHEN :orderBy = 'email' THEN email END ASC ", nativeQuery = true)
    List<Cliente> findAll(@Param("orderBy") String orderBy);

    Optional<Cliente> findById(Long id);

    void deleteById(Long id);

    default Cliente create(Cliente cliente) {
        return save(cliente);
    }

}
