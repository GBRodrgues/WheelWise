CREATE TABLE motocicletas (
  id SERIAL PRIMARY KEY,
  modelo VARCHAR(100),
  fabricante VARCHAR(100),
  cilindrada INT,
  potencia DECIMAL,
  peso DECIMAL,
  tipo VARCHAR(50),
  preco DECIMAL
);
