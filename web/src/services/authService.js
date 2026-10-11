import api from './api'

export async function fazerLogin(email, pin) {
    const resposta = await api.post('/auth/login', {
        email, 
        pin
    })

    return resposta.data
}

export async function fazerCadastro(dados) {
    const resposta = await api.post('/auth/cadastrar', dados)

    return resposta.data
}

export function fazerLogout() {
    localStorage.removeItem('token')
}