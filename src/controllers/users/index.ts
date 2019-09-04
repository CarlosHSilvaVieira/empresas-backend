import * as jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'

import { IAuth } from 'interfaces/iauth'
import { IUser } from 'interfaces/iuser'
import ServerVariables from './../../utils/serverVariables'
import User from '../../entities/user'
import usersModel from '../../models/users'

class UsersController {

    private static createToken(user: IUser): string {
        const token = jwt.sign({ user }, ServerVariables.key, { algorithm: 'HS256', expiresIn: ServerVariables.expires })
        return token
    }

    signIn(req: Request, res: Response, next: NextFunction) {

        const user: IUser = req.body
        const promise: Promise<IUser> = usersModel.getUser(user)
        promise.then((result: IUser) => {

            const token = UsersController.createToken(result)
            const authentication: IAuth = {
                access_token: token,
                uid: result.uid,
                client: result.email,
            }
            res.status(200).json(authentication)
        })

        promise.catch((error) => {
            res.status(500).send(error)
        })
    }
}

export default new UsersController()
