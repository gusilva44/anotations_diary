import api from './api.js'

export async function buscarAnotacoes() {
    const resultado = await api.get('/anotacoes')

    return resultado.data
}

export async function criarAnotacao(dados) {
    const resultado = await api.post('/anotacoes', dados)

    return resultado.data
}

export async function buscarPorFiltros(filtros = {}) {
    const resposta = await api.get('/anotacoes', {
        params: filtros
    })

    return resposta.data
}

export async function deletarAnotacao(id) {
    const resultado = await api.delete(`/anotacoes/${id}`)

    return resultado.data
}

export async function atualizarAnotacao(dados, id_anotacao) {
    const resultado = await api.put(`/anotacoes/${id_anotacao}`, dados)
}