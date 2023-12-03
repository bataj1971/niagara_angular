import { NameDataModel } from "src/app/models/NameDataModel";
import { AddressModel } from "./AddressModel";

export class UserModel extends NameDataModel {
  loginname: string = "";
  birthdate: string = "";
  email: string = "";
  address_id: string = "";
  address: AddressModel = new AddressModel();
  rights?: UserRight[] = [];
  groups?: UserGroup[] = [];
}

export class UserRight {
  id: string = "";
  name: string = "";
  level: string = "";
}

export class UserGroup {
  id: string = "";
  name: string = "";
}
