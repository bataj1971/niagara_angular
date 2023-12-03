import { Injectable } from '@angular/core';
import { GroupModel } from '../models/GroupModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class GroupService extends BaseService<GroupModel> {
  override setPath(): void {
    this.path = "groups/";
  }

  override getRecordId(record: GroupModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): GroupModel {
    return new GroupModel();
  }
}
