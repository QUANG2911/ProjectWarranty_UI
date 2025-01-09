export class WarramtyRecordList{
    IdWarrantyRecord !: number;
    CustomerName !:string;
	DeviceName !:string;
	DateOfResig !:Date;
    TimeEnd !: Date;
    IdCustomer !: number;
    constructor( 
        TimeEnd : Date,
        DeviceName :string,
        CustomerName :string,
        DateOfResig :Date,
        IdWarrantyRecord : number,
        IdCustomer: number
    )
    {
        this.IdWarrantyRecord = IdWarrantyRecord;
        this.CustomerName = CustomerName;
        this.DeviceName = DeviceName;
        this.DateOfResig = DateOfResig;
        this.TimeEnd = TimeEnd;
        this.IdCustomer = IdCustomer;
    }
}
