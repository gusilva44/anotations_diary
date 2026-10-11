import * as db from '../repo/adminRepo.js'
import bcrypt from 'bcrypt'
import validarId from '../utils/validarId.js'

export function buscarTodosClientes() {
    return db.buscarClientes()
}

export async function buscarClientePorId(id_usuario) {
    const id = validarId(id_usuario)

    return db.buscarClientePorId(id)
}

export async function atualizarCliente(dados, id_usuario) {
    if (!dados || typeof dados !== 'object') {
        throw new Error('Digite os dados corretamente')
    }

    const id = validarId(id_usuario)

    const usuario = await db.buscarUsuariosPorId(id)

    if (!usuario) {
        throw new Error('Usuário não encontrado')
    }

    const {
        nome,
        email,
        telefone,
        pinAntigo,
        pinNovo,
        sexo
    } = dados

    if (
        !nome ||
        !email ||
        !telefone ||
        !pinAntigo ||
        !pinNovo ||
        !sexo
    ) {
        throw new Error('Todos os dados devem ser preenchidos')
    }

    const pinCorreto = await bcrypt.compare(
        pinAntigo,
        usuario.pin_hash
    )

    if (!pinCorreto) {
        throw new Error('PIN antigo incorreto')
    }

    const novoPin = await bcrypt.hash(pinNovo, 8)

    return db.atualizarCliente({
        nome,
        email,
        telefone,
        pin: novoPin,
        sexo
    }, id)
}

export function deletarClientePorId(id_cliente) {
    const id = validarId(id_cliente)

    return db.deletarClientePorId(id)
}