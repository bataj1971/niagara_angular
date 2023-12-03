import { BaseDataModel } from "./BaseDataModel";

export class ReceiptLineModel extends BaseDataModel {
    receipt_id: string = '';
    article_id: string = '';
    qty: number = 0;
    price: number = 0;
    rabat: number = 0;
    vat: number = 0;
    
}