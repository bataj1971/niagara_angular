import { Injectable } from '@angular/core';
import { CountryModel } from '../models/CountryModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class CountryService extends BaseService<CountryModel> {
  override setPath(): void {
    this.path = "countries/";
  }

  override getRecordId(record: CountryModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): CountryModel {
    return new CountryModel();
  }
}
