export class selectList {
    IdRepairPart!: number;
    Amount!: number;
    Price!: number;

    constructor(IdRepairPart: number, Amount: number, Price: number)
    {
        this.IdRepairPart = IdRepairPart;
        this.Amount = Amount;
        this.Price = Price;
    }
}