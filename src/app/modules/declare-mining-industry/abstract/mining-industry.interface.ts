
export interface IMiningIndustry {
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

export interface IResultAddMiningIndustry{
    status: string;
    miningIndustry: IMiningIndustry;
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
    listProduct: IProduct[];
}

export interface IProduct{
    displayName: string;
    name: string;
    unit: string;
}
