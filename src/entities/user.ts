import { IUser } from "interfaces/iuser"

class User implements IUser {
    uid?: number;
    email: string;
    password: string;

    constructor(email: string, password: string, uid?: number) {
        this.uid = uid
        this.email = email
        this.password = password
    }

}

export default User
