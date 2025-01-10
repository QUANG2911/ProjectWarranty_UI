export class DetailTaskListRepairDone{
    IdRepairPart !: string;
	RepairPartName !:string;
    Price !: number;
    Amount !: number;
    constructor( 
        IdRepairPart : string,
        Amount :number,
        RepairPartName :string,
        Price : number,
    )
    {
        this.RepairPartName = RepairPartName;
        this.IdRepairPart = IdRepairPart;
        this.Price = Price;
        this.Amount = Amount;
    }
}