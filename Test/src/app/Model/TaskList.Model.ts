export class TaskList{
    IdWarrantRecord !: number;
    CustomerName !:string;
    CustomerPhone !:string;
	IdTask !:number;
	DateOfTask !:Date;
    DateOfWarranty !:Date;
    StatusTask !: number;
    constructor( 
        CustomerName :string,
        CustomerPhone : string,
        DateOfTask :Date,
        DateOfWarranty : Date,
        IdTask :number,       
        IdWarrantRecord : number,
        StatusTask: number
    )
    {
        this.IdWarrantRecord = IdWarrantRecord;
        this.CustomerName = CustomerName;
        this.IdTask = IdTask;
        this.DateOfTask = DateOfTask;
        this.DateOfWarranty = DateOfWarranty;
        this.CustomerPhone = CustomerPhone;
        this.StatusTask = StatusTask;
    }
}
