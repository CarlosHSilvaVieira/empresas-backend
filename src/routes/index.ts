import { NextFunction, Request, Response, Router } from 'express'

import authMiddleware from './../middleware/auth'
import enterprisesRoutes from './enterprises'
import usersRoutes from './users'

const api = Router()

api.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send('API funcionando corretamente')
})

api.use('/users', usersRoutes)
api.use('/enterprises', authMiddleware, enterprisesRoutes)

export default api
