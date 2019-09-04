import { NextFunction, Request, Response, Router } from 'express'

import EnterprisesController from '../../controllers/enterprises'

const api = Router()

// enterprises index
api.get('/', EnterprisesController.getEnterpriseByTypeAndName)

// get all
api.get('/all', EnterprisesController.getAll)

// show
api.get('/:id', EnterprisesController.getEnterprisesById)

export default api
