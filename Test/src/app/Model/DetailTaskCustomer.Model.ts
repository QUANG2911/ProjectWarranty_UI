export class DetailTaskCustomer{
    IdTask !: number;
    CustomerName !:string;
	CustomerPhone !:string;
    ReasonBringFix !: string;
    StatusTask !: number;
    constructor( 
        ReasonBringFix : string,
        IdTask : number,
        CustomerName :string,
        CustomerPhone :string,
        StatusTask : number,
    )
    {
        this.IdTask = IdTask;
        this.CustomerName = CustomerName;
        this.CustomerPhone = CustomerPhone;
        this.ReasonBringFix = ReasonBringFix;
        this.StatusTask = StatusTask;
    }
}