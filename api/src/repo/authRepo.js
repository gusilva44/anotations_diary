import { db } from '../repo/connection.js'

export async function buscarUsuarioPorEmail(email) {

    const [resultado] = await db.query(`
        SELECT
            id_usuario,
            email,
            pin_hash,
            tipo
        FROM usuarios
        WHERE email = ?
    `, [email])

    return resultado[0]
}

export async function buscarUsuarioPorId(idUsuario) {

    const [resultado] = await db.query(`
        SELECT
            id_usuario,
            email,
            tipo
        FROM usuarios
        WHERE id_usuario = ?
    `, [idUsuario])

    return resultado[0]
}

export async function buscarClientePorTelefone(telefone) {

    const [resultado] = await db.query(`
        SELECT * FROM clientes
        WHERE telefone = ?
    `, [telefone])

    return resultado[0]
}

export async function cadastrarCliente(dados) {
    try {
        await db.beginTransaction()

        const [usuario] = await db.query(`
            INSERT INTO usuarios (
                email,
                pin_hash,
                tipo
            )
            VALUES (?, ?, 'cliente')
        `, [
            dados.email,
            dados.pinHash
        ])

        const idUsuario = usuario.insertId

        const [clientes] = await db.query(`
            INSERT INTO clientes (
                id_usuario,
                nome,
                email,
                telefone,
                sexo
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            idUsuario,
            dados.nome,
            dados.email,
            dados.telefone,
            dados.sexo
        ])

        await db.commit()

        return {
            id_usuario: idUsuario,
            id_cliente: clientes.insertId
        }

    } catch (error) {

        await db.rollback()

        throw error
    }
}

export async function buscarClientePorUsuario(idUsuario) {

    const [resultado] = await db.query(`
        SELECT
            id_cliente,
            id_usuario,
            nome
        FROM clientes
        WHERE id_usuario = ?
    `, [idUsuario])

    return resultado[0]
}