import { Injectable } from '@angular/core';
import { ArticleCategoryModel } from '../models/ArticleCategoryModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: "root",
})
export class ArticleCategoryService extends BaseService<ArticleCategoryModel> {
  override setPath(): void {
    this.path = "articleCategories/";
  }

  override getRecordId(record: ArticleCategoryModel) {
    return record.id.toString();
  }

  override getEmptyRecord(): ArticleCategoryModel {
    return new ArticleCategoryModel();
  }
}
