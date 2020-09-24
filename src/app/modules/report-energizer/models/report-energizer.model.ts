export class ReportEmission {
  public id: number;
  public yearDeclare: number;
  public taxCode: number;
  public address: string;
  public productMajor: string;
  public employeesPerYear: number;
  public co2Electric: number;
  public energyProcess: Emission;
  public productionProcess: Emission;
  public co2Total: number;
}

export class Emission {
  public co2: number;
  public ch4: number;
  public no2: number;
}
