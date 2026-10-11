import * as db from '../repo/authRepo.js'
import bcrypt from 'bcrypt'
import { gerarToken } from '../utils/jwt.js'

export async function criarUsuario(dados) {

    if (!dados) {
        throw new Error("Digite os dados corretamente")
    }

    const { nome, email, telefone, pin, sexo } = dados

    if (!nome || !email || !telefone || !pin || !sexo ) {
        throw new Error("Todos os campos são obrigatorios")
    }

    const [
        usuarioExistente,
        telefoneExistente
    ] = await Promise.all([
        db.buscarUsuarioPorEmail(email),
        db.buscarClientePorTelefone(telefone)
    ])

    if (usuarioExistente) {
        throw new Error("Usuario cadastrado com esse email")
    }

    if (telefoneExistente) {
        throw new Error("Usuario cadastrado com esse telefone")
    }

    const pinHash = await bcrypt.hash(String(pin), 8)

    return db.cadastrarCliente({
        nome,
        email,
        telefone,
        sexo,
        pinHash
    })
}

export async function login(email, pin) {

    if (!email || !pin) {
        throw new Error("Todos os campos são obrigatorios")
    }

    const usuario = await db.buscarUsuarioPorEmail(email)

    if (!usuario) {
        throw new Error("Usuario não cadastrado")
    }

    const senhaNormal = await bcrypt.compare(
        String(pin),
        usuario.pin_hash
    )

    if (!senhaNormal) {
        throw new Error("Pin incorreto")
    }

    const token = gerarToken(usuario)
    console.log(token)

    return {
        token,
        usuario: {
            id_usuario: usuario.id_usuario,
            email: usuario.email
        }
    }
}