CREATE TABLE fabricantes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100),
    data_criacao DATE,
    data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motocicleta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ano_fabricacao INT,
    id_fabricante INT NOT NULL,
    json_informacao JSONB,
    data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fabricante) REFERENCES fabricantes(id) ON DELETE CASCADE
);

CREATE TABLE img_motocicleta (
    id SERIAL PRIMARY KEY,
    id_motocicleta INT NOT NULL,
    url TEXT NOT NULL,
    data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_motocicleta) REFERENCES motocicleta(id) ON DELETE CASCADE
);
