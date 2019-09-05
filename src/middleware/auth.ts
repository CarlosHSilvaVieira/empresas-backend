import * as jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'

import ServerConstants from '../utils/serverConstants'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

        const access_token: string = String(req.headers['access-token'])
        const client: string = String(req.headers['client'])
        const uid: string = String(req.headers['uid'])
        const token: any = jwt.verify(access_token, ServerConstants.key)

        if (token && client && access_token && uid) {

            if (token.user.uid == uid || token.user.email == client) {

                next()
            }
            // tslint:disable-next-line: curly
            else
                res.status(403).json({ message: 'Campos de autenticação errados, por favor revise e envie novamente', status: 'Acesso negado' })
        }
        else
            res.status(403).json({ message: 'Campos de autenticação não enviados, por favor envie novamente', status: 'Acesso negado' })

    } catch (error) {

        res.status(403).json({ message: 'access-token inválido', status: 'Acesso negado' })
    }
}
