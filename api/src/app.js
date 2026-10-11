import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { rotas } from './router.js';


const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
rotas(app)

app.listen(PORT, () => {
    console.log(`---> API rodando na porta ${PORT}`)
})