import { NextFunction, Request, Response, Router } from 'express'

const api = Router()

// show
// api.get('/:id')

//enterprises index
api.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.status(200).send('teste middleware')
})


export default api
