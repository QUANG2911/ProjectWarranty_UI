export class CustomerListItem{
    IdCusomer !: number;
    CustomerName !:string;
	CustomerEmail !:string;
	CustomerPhone !:string;
    CustomerAdrress !: string;

    constructor( 
        CustomerAdrress : string,
        CustomerEmail :string,
        CustomerName :string,
        CustomerPhone :string,
        IdCusomer : number
    )
    {
        this.IdCusomer = IdCusomer;
        this.CustomerName = CustomerName;
        this.CustomerEmail = CustomerEmail;
        this.CustomerPhone = CustomerPhone;
        this.CustomerAdrress = CustomerAdrress;
    }
}