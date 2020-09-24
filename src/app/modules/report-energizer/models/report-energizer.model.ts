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

export class Emission {
  public co2: number;
  public ch4: number;
  public n2O: number;
}
