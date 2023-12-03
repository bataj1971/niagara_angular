import { Injectable } from '@angular/core';
import { CurrencyModel } from '../models/CurrencyModel';
import { BaseService } from './base.service';


/**
 * delete this, wrong naming
 */
@Injectable({
  providedIn: "root",
})
class CurrenciesService extends BaseService<CurrencyModel> {
  override setPath(): void {
    this.path = "countries/";
  }

  override getRecordId(record: CurrencyModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): CurrencyModel {
    return new CurrencyModel();
  }
}
