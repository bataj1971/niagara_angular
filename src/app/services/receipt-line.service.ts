import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ReceiptLineModel } from '../models/ReceiptLineModel';

@Injectable({
  providedIn: "root",
})
export class ReceiptLineService extends BaseService<ReceiptLineModel> {
  override setPath(): void {
    this.path = "receiptLines/";
  }

  override getRecordId(record: ReceiptLineModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): ReceiptLineModel {
    return new ReceiptLineModel();
  }
}
