import api from './api.js'

export async function buscarClientes() {
    const resultado = await api.get('/admin/clientes')

    return resultado.data
}

export async function buscarClientePorId(id) {
    const resultado = await api.get(`/admin/clientes/${id}`)

    return resultado.data
}

export async function atualizarCliente(dados) {
    const resultado = await api.put('/admin/clientes', dados)

    return resultado.data
}

export async function deletarCliente(id) {
    const resultado = await api.delete(`/admin/clientes/${id}`)

    return resultado.data
}