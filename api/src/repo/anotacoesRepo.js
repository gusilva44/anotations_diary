import { db } from '../repo/connection.js'

export async function buscarAnotacoes(id_usuario) {
    const [resultado] = await db.query(`
        SELECT * FROM anotacoes
        WHERE id_usuario = ?
        ORDER BY criado_em DESC
    `, [id_usuario])

    return resultado
}

export async function criarAnotacao(dados, id_usuario) {
    const [resultado] = await db.query(`
    INSERT INTO anotacoes(id_usuario, titulo, mensagem, cor, categoria)
    VALUES(?, ?, ?, ?, ?)`,
    [
        id_usuario,
        dados.titulo,
        dados.mensagem,
        dados.cor,
        dados.categoria
    ])

    return resultado.insertId
}

export async function deletarAnotacao(id_anotacao, id_usuario) {
    const [resultado] = await db.query(`
            DELETE FROM anotacoes
            WHERE id_anotacao = ?
            AND id_usuario = ?
        `,
        [
            id_anotacao, 
            id_usuario
        ]
    )

    return resultado.affectedRows
}

export async function buscarAnotacoesPorFiltro({
    id,
    titulo,
    categoria
}) {
    let query = `
        SELECT *
        FROM anotacoes
        WHERE 1 = 1
    `

    const valores = []

    if (id !== undefined && id !== null && id !== '') {
        query += ` AND id_anotacao = ?`
        valores.push(id)
    }

    if (titulo) {
        query += ` AND titulo LIKE ?`
        valores.push(`%${titulo}%`)
    }

    if (categoria) {
        query += ` AND categoria = ?`
        valores.push(categoria)
    }

    query += ` ORDER BY criado_em DESC`

    const [resultado] = await db.query(query, valores)

    return resultado
}

export async function atualiazarAnotacao(dados, id_anotacao, id_usuario) {
    const [resultado] = await db.query(`
        UPDATE anotacoes
        SET titulo = ?,
            mensagem = ?,
            cor = ?,
            categoria = ?
        WHERE id_anotacao = ?
        AND id_usuario = ?
    `, [
        dados.titulo,
        dados.mensagem,
        dados.cor,
        dados.categoria,
        id_anotacao,
        id_usuario
    ])

    return resultado.affectedRows
}