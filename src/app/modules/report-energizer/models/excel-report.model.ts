export class ExcelReport {
    filedName: string;
    data: string;
    unit: string;

    constructor(filedName: string, data: string, unit: string) {
        this.filedName = filedName;
        this.data = data;
        this.unit = unit;
    }
}
