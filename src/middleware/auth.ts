import * as jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'

import { IUser } from 'interfaces/iuser'
import ServerConstants from '../utils/serverConstants'
import UserModel from '../models/users'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

        const ip: string = req.ip
        const user_agent: string = req.headers['user-agent']
        const access_token: string = String(req.headers['access-token'])
        const client: string = String(req.headers['client'])
        const uid: string = String(req.headers['uid'])
        const token: any = jwt.verify(access_token, ServerConstants.key)

        if (token && client && access_token && uid) {

            const targetUser: IUser = await UserModel.getUserByUid(token.target.uid)

            // caso consiga encontrar o usuário
            if (targetUser) {

                // caso seja o mesmo IP e dispositivo
                if (token.target.ip === ip && token.target.user_agent === user_agent) {

                    // se a chave presente no uid estiver dentro do token
                    if (token.target.access_uid === uid && targetUser.email === client) {

                        next()
                    }
                    else
                        res.status(403).json({ message: 'Campos de autenticação errados, por favor revise e envie novamente', status: 'Acesso negado' })
                }
                else
                    res.status(403).json({ message: 'Dispositivo não autorizado', status: 'Acesso negado' })
            }
            else
                res.status(403).json({ message: 'Usuário não encontrado', status: 'Acesso negado' })
        }
        else
            res.status(403).json({ message: 'Campos de autenticação não enviados, por favor envie novamente', status: 'Acesso negado' })

    } catch (error) {

        res.status(403).json({ message: 'access-token inválido', status: 'Acesso negado' })
    }
}
