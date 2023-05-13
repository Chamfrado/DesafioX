CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  cnpj VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL ,
  telefone VARCHAR(255) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  localizacao VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

