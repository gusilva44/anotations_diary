export default function validarId(id) {
    const numero = Number(id)

    if (!Number.isSafeInteger(numero) || numero <= 0) {
        throw new Error('Digite um ID válido')
    }

    return numero
}