CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  cnpj VARCHAR(14),
  email VARCHAR(255),
  telefone VARCHAR(20),
  uf CHAR(2),
  localizacao GEOMETRY(Point),
  created_at TIMESTAMP
);

