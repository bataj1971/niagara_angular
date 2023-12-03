import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RightModel } from '../models/RightModel';

@Injectable({
  providedIn: "root",
})
export class RightService extends BaseService<RightModel> {
  override setPath(): void {
    this.path = "rights/";
  }

  override getRecordId(record: RightModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): RightModel {
    return new RightModel();
  }
}
