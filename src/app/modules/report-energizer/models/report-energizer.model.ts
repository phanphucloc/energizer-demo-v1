import { BranchesValue } from './../../declare-enterprises/models/enterprises.model';
export class ReportEmission {
  public id: number;
  public year: number;
  public taxCode: number;
  public enterpriseName: string;
  public province: string;
  public employees: number;
  public branches: BranchesValue[];
  public energyProcess: Emission;
  public productionProcess: Emission;
  public totalCO2: number;
}

export class ReportEmissionByField {
  public id: number;
  public year: number;
  public fieldName: string;
  public employees: number;
  public energyProcess: Emission;
  public productionProcess: Emission;
  public totalCO2: number;
  public co2inEnergyProcess: number;
  public co2inProductionProcess: number;
}

export class Emission {
  public co2: number;
  public ch4: number;
  public n2O: number;
}

export class ReportComsumption {
  public id: number;
  public year: number;
  public fieldName: string;
  public employees: number;
  public antraxitCoal: number;
  public bitumCoal: number;
  public lignite: number;
  public coke: number;
  public peat: number;
  public fuel: number;
  public dooil: number;
  public fooil: number;
  public lpg: number;
}
