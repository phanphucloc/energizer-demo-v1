export class ExcelReport {
    filedName: string;
    data2017: string;
    data2018: string;
    data2019: string;
    unit: string;

    constructor(filedName: string, data2017: string, data2018: string, data2019: string, unit: string) {
        this.filedName = filedName;
        this.data2017 = data2017;
        this.data2018 = data2018;
        this.data2019 = data2019;
        this.unit = unit;
    }
}
