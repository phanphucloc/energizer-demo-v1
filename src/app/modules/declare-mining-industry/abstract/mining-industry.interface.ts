
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
