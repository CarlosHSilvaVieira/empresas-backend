import * as jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'

import ServerVariables from '../utils/serverVariables'

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

        const token: string = String(req.headers['access-token'])
        const client: string = String(req.headers['client'])
        const uid: string = String(req.headers['uid'])
        const result: any = jwt.verify(token, ServerVariables.key)
        console.log(result)
        if (!result || !uid || !client || !token) {
            res.status(403).json({ status: 'acesso negado' })
        }

        if (result.user.uid !== uid || result.user.email !== client) {
            res.status(403).json({ status: 'acesso negado' })
        }

        next()

    } catch (error) {
        
        res.status(403).json({ error, status: 'acesso negado' })
    }
}