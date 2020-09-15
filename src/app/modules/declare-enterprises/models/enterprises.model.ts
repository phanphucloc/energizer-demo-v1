import { IEnergyConsumption, IEnterprises, IEnterprisesToServer, IProduction, IFields, IBranches } from '../abstract/enterprises.interface';

export class Enterprises implements IEnterprises {
    id: number;
    fieldId: number;
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
export class EnterprisesToServer implements IEnterprisesToServer {
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
    branchesId: number;
    branchesName: string;
    listProduction: Production[];
    listEnergyConsumption: EnergyConsumption[];
}

export class Production implements IProduction{
    id: number;
    displayName: string;
    name: string;
    unit: string;
    value: number;
}

export class EnergyConsumption implements IEnergyConsumption{
    id: number;
    displayName: string;
    name: string;
    unit: string;
    value: number;
}

export class Fields implements IFields{
    id: number;
    name: string;
    listBranches: IBranches[];
}