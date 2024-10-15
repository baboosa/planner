import app from './app'

const SERVER_PORT = process.env.SERVER_PORT || 5000

app.listen(SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${SERVER_PORT}`)
})
