import { IMiningIndustry } from '../abstract/mining-industry.interface';

export class MiningIndustry implements IMiningIndustry {
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
    ab: number;
}
