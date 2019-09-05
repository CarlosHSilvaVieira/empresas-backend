import * as jwt from 'jsonwebtoken'
import * as uuid from 'uuid/v1'

import { NextFunction, Request, Response } from 'express'

import { IAuth } from 'interfaces/iauth'
import { IUser } from 'interfaces/iuser'
import ServerConstants from '../../utils/serverConstants'
import User from '../../entities/user'
import usersModel from '../../models/users'

class UsersController {

    private static createToken(user: IUser, access_uid: string, ip: string, user_agent: string): string {
        const target: any = user
        target.access_uid = access_uid
        target.ip = ip
        target.user_agent = user_agent
        const token = jwt.sign({ target }, ServerConstants.key, { algorithm: 'HS256', expiresIn: ServerConstants.expires })
        return token
    }

    signIn(req: Request, res: Response, next: NextFunction) {

        const ip: string = String(req.ip)
        const user_agent: string = String(req.headers['user-agent'])
        const user: IUser = req.body

        const promise: Promise<IUser> = usersModel.getUser(user)
        promise.then((result: IUser) => {

            const access_uid: string = uuid()
            const token = UsersController.createToken(result, access_uid, ip, user_agent)

            const authentication: IAuth = {
                access_token: token,
                client: result.email,
                uid: access_uid,
            }

            res.status(200).json(authentication)
        })

        promise.catch((error) => {
            res.status(500).send(error)
        })
    }
}

export default new UsersController()
