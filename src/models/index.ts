import { createConnection } from 'mysql'

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'q1w2e3r4',
    port: 3306,
    database: 'empresas_backend'
})

connection.connect((error) => {

    if(error)
        console.log('Erro ao conectar com banco de dados ', error)
})

export default connection
