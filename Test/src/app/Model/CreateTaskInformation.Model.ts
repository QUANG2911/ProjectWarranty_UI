export class TaskInformation{
    CustomerName !:string;
	CustomerEmail !:string;
	CustomerPhone !:string;
	DeviceName !:string;
	IdWarrantRecord !:number;
	ReasonBringFix !:string;
    CustomerAddress !: string;

    constructor( CustomerName :string,
        CustomerEmail :string,
        CustomerPhone :string,
        DeviceName :string,
        IdWarrantRecord :number,
        ReasonBringFix :string,
        CustomerAddress : string
    )
    {
        this.CustomerName = CustomerName;
        this.CustomerEmail = CustomerEmail;
        this.CustomerPhone = CustomerPhone;
        this.DeviceName = DeviceName;
        this.IdWarrantRecord = IdWarrantRecord;
        this.ReasonBringFix = ReasonBringFix;
        this.CustomerAddress = CustomerAddress;
    }
}

