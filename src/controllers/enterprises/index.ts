import { NextFunction, Request, Response } from 'express'

import Enterprise from '../../entities/enterprise'
import EnterpriseType from '../../entities/enterpriseType'
import EnterprisesModel from '../../models/enterprises'
import { IEnterpriseQuery } from 'interfaces/ienterprise'

class EnterprisesController {

    constructor() {
        this.getEnterpriseByTypeAndName = this.getEnterpriseByTypeAndName.bind(this)
        this.getAll = this.getAll.bind(this)
    }

    getEnterpriseByTypeAndName(req: Request, res: Response, next: NextFunction) {

        try {
            const type: string = req.query.enterprise_types
            const name: string = req.query.name

            const promise: Promise<IEnterpriseQuery[]>  = EnterprisesModel.getEnterprisesByTypeAndName(type, name)

            promise.then((result: IEnterpriseQuery[]) => {

                if (result.length) {

                    const list: Enterprise[] = this.createListEnterprises(result)
                    res.status(200).json({ data: list })
                }
                else
                    res.status(200).json({ message: 'Não foram encontrados registros correspondentes a busca' })
            })

            promise.catch((error) => {
                res.status(500).send(error)
            })

        } catch (error) {
            res.status(400).send(error)
        }
    }

    getEnterprisesById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = req.params.id
            const promise: Promise<IEnterpriseQuery[]> = EnterprisesModel.getEnterpriseById(id)

            promise.then((result: IEnterpriseQuery[]) => {

                if (result.length) {
                    const enterprise = new Enterprise(result[0].name, result[0].id, new EnterpriseType(result[0].enterprise_type, result[0].enterprise_type_id))
                    res.status(200).json(enterprise)
                }
                else
                    res.status(200).json({ message: 'Não foram encontrados registros correspondentes a busca' })
            })

            promise.catch((error) => {
                res.status(500).send(error)
            })

        } catch (error) {
            res.status(400).send(error)
        }
    }

    getAll(req: Request, res: Response, next: NextFunction) {

        try {
            const promise: Promise<IEnterpriseQuery[]> = EnterprisesModel.getAll()

            promise.then((result: IEnterpriseQuery[]) => {

                if (result.length) {
                    const enterprises = this.createListEnterprises(result)
                    res.status(200).json({ data: enterprises})
                }
                else
                    res.status(200).json({ message: 'Não foram encontrados registros' })
            })

            promise.catch((error) => {
                res.status(500).send(error)
            })

        } catch (error) {
            res.status(400).send(error)
        }
    }

    private createListEnterprises(result: IEnterpriseQuery[]): Enterprise[] {

        let list: Enterprise[] = []

        list = result.map((value: IEnterpriseQuery) => {

            const enterprise = new Enterprise(value.name, value.id, new EnterpriseType(value.enterprise_type, value.enterprise_type_id))
            return enterprise
        })

        return list
    }
}

export default new EnterprisesController()
