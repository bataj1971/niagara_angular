import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService<UserModel> {
  override setPath(): void {
    this.path = "users/";
  }

  override getRecordId(record: UserModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): UserModel {
    return new UserModel();
  }
}
