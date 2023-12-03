import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ArticleModel } from '../models/ArticleModel';

@Injectable({
  providedIn: "root",
})
export class ArticleService extends BaseService<ArticleModel> {
  override setPath(): void {
    this.path = "articles/";
  }

  override getRecordId(record: ArticleModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): ArticleModel {
    return new ArticleModel();
  }
}
