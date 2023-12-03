import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerModel } from '../models/CustomerModel';

@Injectable({
  providedIn: "root",
})
export class CustomerService extends BaseService<CustomerModel> {
  override setPath(): void {
    this.path = "customers/";
  }

  override getRecordId(record: CustomerModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): CustomerModel {
    return new CustomerModel();
  }
}
