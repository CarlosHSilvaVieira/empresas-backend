import { Connection, MysqlError } from 'mysql'

import { IUser } from 'interfaces/iuser'
import User from '../../entities/user'
import connection from './../index'

class UsersModel {

    private mysql: Connection

    constructor() {
        this.mysql = connection
    }

    public getUser(user: IUser): Promise<IUser> {

        const query: string = `Select * from users where email = '${user.email}' and password = '${user.password}'`
        return this.executeQuery(query)
    }

    private executeQuery(query: string): Promise<IUser> {

        const promise: Promise<IUser> = new Promise((resolve, reject) => {

            this.mysql.query(query, (error: MysqlError, result) => {

                if (error || !result.length) {
                    reject(error)
                }

                const user: User = new User(result[0].email, result[0].password, result[0].uid)
                resolve(user)
            })
        })

        return promise
    }
}

export default new UsersModel()
