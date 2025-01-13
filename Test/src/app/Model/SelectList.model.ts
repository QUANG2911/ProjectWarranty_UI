export class selectList {
    IdRepairPart!: number;
    RepairPartName!: string;
    Amount!: number;
    Price!: number;

    constructor(IdRepairPart: number, RepairPartName: string,Amount: number, Price: number)
    {
        this.IdRepairPart = IdRepairPart;
        this.RepairPartName = RepairPartName;
        this.Amount = Amount;
        this.Price = Price;
    }
}