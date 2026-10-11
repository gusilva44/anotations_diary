-- Active: 1790850489930@@127.0.0.1@3306@testeJWT
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    pin_hash VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente'
);

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(12) NOT NULL UNIQUE,
    sexo ENUM('M', 'F') NOT NULL,

    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_clientes_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);


drop table usuarios;
drop table clientes;
drop table anotacoes;

CREATE TABLE anotacoes (
    id_anotacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensagem VARCHAR(1000) NOT NULL,
    cor VARCHAR(100) NOT NULL,
    categoria ENUM('padrão', 'importante', 'urgente', 'secreto')
        NOT NULL DEFAULT 'padrão',

    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_anotacoes_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

UPDATE usuarios
set tipo = "admin"
WHERE id_usuario = 2;