

-- exclui a condição de chave estrangeira "cliente_id" 
ALTER TABLE IF EXISTS venda
DROP CONSTRAINT IF EXISTS venda_cliente_id_fkey;
DROP TABLE IF EXISTS venda;