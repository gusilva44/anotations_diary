
import { db } from './connection.js'

export async function buscarClientes() {
    const [resultado] = await db.query(`
        SELECT
            c.id_cliente,
            c.id_usuario,
            c.nome,
            c.email,
            c.telefone,
            u.tipo
        FROM clientes c
        INNER JOIN usuarios u
            ON c.id_usuario = u.id_usuario
    `)

    return resultado
}

export async function buscarUsuariosPorId(id_usuario) {
    const [resultado] = await db.query(`
        SELECT *
        FROM usuarios
        WHERE id_usuario = ?
    `, [id_usuario])

    return resultado[0]
}

export async function buscarClientePorId(id_usuario) {
    const [resultado] = await db.query(`
        SELECT *
        FROM clientes
        WHERE id_usuario = ?
    `, [id_usuario])

    return resultado[0]
}

export async function deletarClientePorId(id_cliente) {
    await db.beginTransaction()

    try {
        const [clientes] = await db.query(`
            SELECT id_usuario
            FROM clientes
            WHERE id_cliente = ?
        `, [id_cliente])

        if (clientes.length === 0) {
            throw new Error('Cliente não encontrado')
        }

        const id_usuario = clientes[0].id_usuario

        await db.query(`
            DELETE FROM clientes
            WHERE id_cliente = ?
        `, [id_cliente])

        const [usuario] = await db.query(`
            DELETE FROM usuarios
            WHERE id_usuario = ?
        `, [id_usuario])

        await db.commit()

        return usuario.affectedRows
    } catch (error) {
        await db.rollback()
        throw error
    }
}

export async function atualizarCliente(dados, id_usuario) {
    await db.beginTransaction()

    try {
        await db.query(`
            UPDATE usuarios
            SET email = ?,
                pin_hash = ?
            WHERE id_usuario = ?
        `, [
            dados.email,
            dados.pin,
            id_usuario
        ])

        const [cliente] = await db.query(`
            UPDATE clientes
            SET nome = ?,
                email = ?,
                telefone = ?,
                sexo = ?
            WHERE id_usuario = ?
        `, [
            dados.nome,
            dados.email,
            dados.telefone,
            dados.sexo,
            id_usuario
        ])

        await db.commit()

        return cliente.affectedRows
    } catch (error) {
        await db.rollback()
        throw error
    }
}