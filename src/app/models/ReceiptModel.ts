import { AddressModel } from "./AddressModel";
import { BaseDataModel } from "./BaseDataModel";

export class ReceiptModel extends BaseDataModel {
  receipttype: string = "ORD";
  status: string = "open";
  receiptnumber: string = "";
  customer_id: string = "";    
  duedate: string = (new Date()).getDate().toLocaleString();
  currency_id: string = "EUR";
  value: number = 0;
  vat: number = 0;
  description: string = "";
  customer: CustomerData = new CustomerData();
  
}

export class CustomerData {
  name: string = "";
  address: AddressModel = new AddressModel();
  shipping_address: AddressModel = new AddressModel();
}