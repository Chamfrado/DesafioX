CREATE TABLE venda (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES cliente (id),
  data VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  
 ON DELETE CASCADE
 ON UPDATE CASCADE
);