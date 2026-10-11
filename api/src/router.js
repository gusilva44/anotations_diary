import admin from '../src/controllers/adminController.js'
import auth from '../src/controllers/authController.js'
import anotacoes from '../src/controllers/anotacoesController.js'

export function rotas(api){
    api.use(auth)
    api.use(admin)
    api.use(anotacoes)
}