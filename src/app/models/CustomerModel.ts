import { AddressModel } from "./AddressModel";
import { NameDataModel } from "./NameDataModel"


export class CustomerModel extends NameDataModel {
  address_id: string = "";
    shipping_address_id: string = '';
    email: string = '';
    address?: AddressModel = new AddressModel();
}