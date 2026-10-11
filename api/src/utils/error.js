export function logError(error) {
    const agora = new Date()
    const horario = `${agora.toLocaleTimeString()} ${agora.toLocaleDateString()}`

    console.log(`\n---> ERROR ${horario}
---> ${error.message}`)
}

export function formatarError(error){
    return {
        erro: error.message
    }
}