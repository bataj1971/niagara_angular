import { Injectable } from '@angular/core';
import { CustomerCategoryModel } from '../models/CustomerCategoryModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class CustomerCategoryService extends BaseService<CustomerCategoryModel> {
  override setPath(): void {
    this.path = "customerCategories/";
  }

  override getRecordId(record: CustomerCategoryModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): CustomerCategoryModel {
    return new CustomerCategoryModel();
  }
}
