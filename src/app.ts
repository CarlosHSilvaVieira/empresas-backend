import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'

import ServerVariables from './utils/serverVariables'
import routes from './routes'

class App {

    public app: express.Application

    constructor() {

        this.app = express()
        this.config()
    }

    private config() {

        //Cors
        this.app.use(cors())

        // Accepting Application/json
        this.app.use(bodyParser.json())

        // Accepting application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }))

        // initialize routes

        this.app.use(`/api/${ServerVariables.version}/`, routes)
    }
}

export default new App().app
