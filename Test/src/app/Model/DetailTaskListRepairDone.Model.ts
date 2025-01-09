export class DetailTaskListRepairDone{
    IdTask !: number;
    CustomerName !:string;
	RepairPartName !:string;
	CustomerPhone !:string;
    ReasonBringFix !: string;
    Price !: number;
    StatusTask !: number;
    Amount !: number;
    constructor( 
        ReasonBringFix : string,
        Amount :number,
        RepairPartName :string,
        CustomerName :string,
        CustomerPhone :string,
        IdTask : number,
        StatusTask : number,
        Price : number,
    )
    {
        this.IdTask = IdTask;
        this.CustomerName = CustomerName;
        this.RepairPartName = RepairPartName;
        this.CustomerPhone = CustomerPhone;
        this.ReasonBringFix = ReasonBringFix;
        this.StatusTask = StatusTask;
        this.Price = Price;
        this.Amount = Amount;
    }
}