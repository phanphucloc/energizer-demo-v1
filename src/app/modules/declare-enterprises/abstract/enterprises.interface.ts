
export interface IEnterprises {
    id: number;
    name: string;
    foundedYear: number;
    province: string;
    district: string;
    town: string;
    xCoordinate: string;
    yCoordinate: string;
    productionValue: number;
    employees: number;
}

export interface IEnterprisesToServer {
    id: number;
    name: string;
    foundedYear: number;
    province: string;
    district: string;
    town: string;
    xCoordinate: string;
    yCoordinate: string;
    productionValue: number;
    employees: number;
    branchesId: number;
    branchesName: string;
    listProduction: IProduction[];
    listEnergyConsumption: IEnergyConsumption[];
}

export interface IResultAddEnterprises{
    status: string;
    miningIndustry: IEnterprises;
}

export interface IFields{
    id: number;
    name: string;
    listBranches: IBranches[];
}

export interface IBranches{
    id: number;
    name: string;
    displayName: string;
    listProduct: IProduction[];
}

export interface IProduction{
    id: number;
    displayName: string;
    name: string;
    unit: string;
    value: number;
}

export interface IEnergyConsumption{
    id: number;
    displayName: string;
    name: string;
    unit: string;
    value: number;
}
