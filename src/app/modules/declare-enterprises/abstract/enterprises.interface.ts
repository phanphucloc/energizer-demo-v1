
export interface IEnterprises {
    id: number;
    name: string;
    fieldId: number;
    foundedYear: number;
    province: string;
    district: string;
    town: string;
    xCoordinate: string;
    yCoordinate: string;
    productionValue: number;
    employees: number;
    branches: IBranchesValue[];
    branchNameAll: string;
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
    fieldId: number;
    branches: IBranchesValue[];
    productions: IProduction[];
    energies: IEnergyConsumption[];
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

export interface IBranchesValue{
    id: number;
    name: string;
}

export interface IProduction{
    enterpriseId: number;
    productionId: number;
    branchId: number;
    displayName: string;
    name: string;
    unit: string;
    volume: number;
}

export interface IEnergyConsumption{
    productionId: number;
    energyId: number;
    displayName: string;
    name: string;
    unit: string;
    volume: number;
}

export interface IDropdown{
    item_id: number;
    item_text: string;
}
