export class selectList {
    idRepairPart!: number;
    amount!: number;
    price!: number;

    constructor(idRepairPart: number, amount: number, price: number)
    {
        this.idRepairPart = idRepairPart;
        this.amount = amount;
        this.price = price;
    }
}