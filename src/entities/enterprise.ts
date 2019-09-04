import { IEnterprise, IEnterpriseType } from 'interfaces/ienterprise'

class Enterprise implements IEnterprise  {

    id?: number
    name: string
    type?: IEnterpriseType

    constructor(name: string, id?: number, type?: IEnterpriseType) {

        this.id = id,
        this.name = name,
        this.type = type
    }
}

export default Enterprise
