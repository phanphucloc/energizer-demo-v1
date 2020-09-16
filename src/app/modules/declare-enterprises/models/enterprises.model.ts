import { IEnergyConsumption, IEnterprises, IEnterprisesToServer, IProduction, IFields, IBranches, IDropdown, IBranchesValue } from '../abstract/enterprises.interface';

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
    branches: BranchesValue[];
    branchNameAll: string;
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
    branches: BranchesValue[];
    productions: Production[];
    energies: EnergyConsumption[];
}

export class Branches implements IBranches{
    id: number;
    name: string;
    displayName: string;
    listProduct: IProduction[];
}

export class BranchesValue implements IBranchesValue{
    id: number;
    name: string;
}


export class Production implements IProduction{
    enterpriseId: number;
    productionId: number;
    branchId: number;
    displayName: string;
    name: string;
    unit: string;
    volume: number;
}

export class EnergyConsumption implements IEnergyConsumption{
    productionId: number;
    energyId: number;
    displayName: string;
    name: string;
    unit: string;
    volume: number;
}

export class Fields implements IFields{
    id: number;
    name: string;
    listBranches: IBranches[];
}

export class Dropdown implements IDropdown{
    // tslint:disable-next-line: variable-name
    item_id: number;
    // tslint:disable-next-line: variable-name
    item_text: string;
}
