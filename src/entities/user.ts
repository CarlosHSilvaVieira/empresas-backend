import { IUser } from 'interfaces/iuser'

class User implements IUser {
    uid?: string
    email: string
    password: string

    constructor(email: string, password: string, uid?: string) {
        this.uid = uid
        this.email = email
        this.password = password
    }

}

export default User
