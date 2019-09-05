import ServerConstants from './../utils/serverConstants'
import { createConnection } from 'mysql'

const connection = createConnection({
    host: ServerConstants.hostDB,
    user: ServerConstants.userDB,
    password: ServerConstants.passDB,
    port: ServerConstants.portDB,
    database: ServerConstants.schemaDB,
})

connection.connect((error) => {

    if (error)
        console.log('Erro ao conectar com banco de dados ', error)
})

export default connection
