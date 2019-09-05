import ServerConstants from './utils/serverConstants'
import app from './app'

const PORT = ServerConstants.port

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT)
})
