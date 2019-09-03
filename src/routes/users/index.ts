import { Router } from 'express'
import UsersController from '../../controllers/users'

const api = Router()

api.post('/auth/sign_in', UsersController.signIn)

export default api
