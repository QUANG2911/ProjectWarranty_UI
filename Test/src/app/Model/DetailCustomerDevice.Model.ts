export class DetailCustomerDeviceListItem{
    IdCusomer !: number;
    CustomerName !:string;
	CustomerEmail !:string;
	CustomerPhone !:string;
    CustomerAdrress !: string;
    CustomerDevice !: string;
    IdWarrantReport !: number;
    DateOfWarrant !: Date;
    TimeEnd !: Date;
    IdDevice !: number;

    constructor( 
        CustomerAdrress : string,
        CustomerDevice :string,
        CustomerEmail :string,
        CustomerName :string,
        CustomerPhone :string,
        DateOfWarrant : Date,
        IdCusomer : number,
        IdDevice : number,
        IdWarrantReport : number,
        TimeEnd : Date,
    )
    {
        this.IdCusomer = IdCusomer;
        this.CustomerName = CustomerName;
        this.CustomerEmail = CustomerEmail;
        this.CustomerPhone = CustomerPhone;
        this.CustomerAdrress = CustomerAdrress;
        this.CustomerDevice = CustomerDevice;
        this.IdDevice = IdDevice;
        this.IdWarrantReport = IdWarrantReport;
        this.TimeEnd = TimeEnd;
        this.DateOfWarrant = DateOfWarrant;
    }
}