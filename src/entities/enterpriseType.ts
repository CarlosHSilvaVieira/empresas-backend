import { IEnterpriseType } from '../interfaces/ienterprise'

class EnterpriseType implements IEnterpriseType {

    id?: number
    name: string

    constructor(name: string, id?: number) {
        this.id = id
        this.name = name
    }
}

export default EnterpriseType
