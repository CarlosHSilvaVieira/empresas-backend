import { Connection } from 'mysql'
import { IEnterpriseQuery } from 'interfaces/ienterprise'
import connection from './../index'

class EnterprisesModel {

    private mysql: Connection

    constructor() {

        this.mysql = connection
    }

    getEnterprisesByTypeAndName(type: string, name: string): Promise<IEnterpriseQuery[]>  {

        const query: string = `Select ENT.id, ENT.name, ENT_TYPE.name as enterprise_type, ENT_TYPE.id as enterprise_type_id
        from enterprises as ENT inner join enterprise_types as ENT_TYPE on (ENT.enterprise_type = ENT_TYPE.id)
        where ENT.enterprise_type = '${this.addSlashes(type)}' and ENT.name = '${this.addSlashes(name)}'`
        return this.executeQuery(query)
    }

    getEnterpriseById(id: string): Promise<IEnterpriseQuery[]> {

        const query: string = `Select ENT.id, ENT.name, ENT_TYPE.name as enterprise_type, ENT_TYPE.id as enterprise_type_id
        from enterprises as ENT inner join enterprise_types as ENT_TYPE on (ENT.enterprise_type = ENT_TYPE.id)
        where ENT.id = '${this.addSlashes(id)}'`
        return this.executeQuery(query)
    }

    getAll() {
        const query: string = `Select ENT.id, ENT.name, ENT_TYPE.name as enterprise_type, ENT_TYPE.id as enterprise_type_id
        from enterprises as ENT inner join enterprise_types as ENT_TYPE on (ENT.enterprise_type = ENT_TYPE.id)`
        return this.executeQuery(query)
    }

    private executeQuery(query: string): Promise<IEnterpriseQuery[]>  {

        const promise: Promise<IEnterpriseQuery[]>  = new Promise((resolve, reject) => {

            this.mysql.query(query, (error, results) => {

                if (error)
                    reject(error)

                resolve(results)
            })
        })

        return promise
    }

    private addSlashes(value: string): string {
        return value.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
    }
}

export default new EnterprisesModel()
