export interface IEnterpriseType {

    id?: number,
    name: string,
}

export interface IEnterprise {

    id?: number,
    name: string,
    type?: IEnterpriseType
}

export interface IEnterpriseQuery {

    id?: number,
    name: string,
    enterprise_type?: string,
    enterprise_type_id?: number
}
