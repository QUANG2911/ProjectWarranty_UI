export class RepairPart{
    IdRepairPart !: string;
	RepairPartName !:string;
    Price !: number;
    Amount !: number;
    constructor( 
        IdRepairPart : string,
        RepairPartName :string,
        Price : number,
        Amount: number
    )
    {
        this.RepairPartName = RepairPartName;
        this.IdRepairPart = IdRepairPart;
        this.Price = Price;
        this.Amount = Amount;
    }
}