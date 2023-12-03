import { BaseDataModel } from "./BaseDataModel";

export class ReceiptModel extends BaseDataModel {
    receipttype: string = '';
    status: string = '';
    receiptnumber: string = '';
    customer_id: string = '';
    duedate: string = '';
    currency_id: string = '';
    value: number = 0;
    var: number = 0;
    description: string = '';
    

}