import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CurrencyModel } from '../models/CurrencyModel';

@Injectable({
  providedIn: "root",
})
export class CurrencyService extends BaseService<CurrencyModel> {
  override setPath(): void {
    this.path = "currencies/";
  }

  override getRecordId(record: CurrencyModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): CurrencyModel {
    return new CurrencyModel();
  }
}
