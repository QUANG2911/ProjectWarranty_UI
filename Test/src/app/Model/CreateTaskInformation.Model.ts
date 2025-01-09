export class TaskInformation{
    customerName !:string;
	customerEmail !:string;
	customerPhone !:string;
	deviceName !:string;
	idWarrantRecord !:number;
	reasonBringFix !:string;
    customerAddress !: string;


    constructor( customerName :string,
        customerEmail :string,
        customerPhone :string,
        deviceName :string,
        idWarrantRecord :number,
        reasonBringFix :string,
        customerAddress : string
    )
    {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.deviceName = deviceName;
        this.idWarrantRecord = idWarrantRecord;
        this.reasonBringFix = reasonBringFix;
        this.customerAddress = customerAddress;
    }
}