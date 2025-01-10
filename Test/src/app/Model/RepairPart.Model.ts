export class RepairPart{
    IdRepairPart !: string;
	RepairPartName !:string;
    Price !: number;
    constructor( 
        IdRepairPart : string,
        RepairPartName :string,
        Price : number,
    )
    {
        this.RepairPartName = RepairPartName;
        this.IdRepairPart = IdRepairPart;
        this.Price = Price;
    }
}