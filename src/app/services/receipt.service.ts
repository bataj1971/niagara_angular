import { Injectable } from '@angular/core';
import { ReceiptModel } from '../models/ReceiptModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class ReceiptService extends BaseService<ReceiptModel> {
  override setPath(): void {
    this.path = "receipts/";
  }

  override getRecordId(record: ReceiptModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): ReceiptModel {
    return new ReceiptModel();
  }
}
