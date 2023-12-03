import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { ArticleCategoryModel } from 'src/app/models/ArticleCategoryModel';
import { ArticleCategoryService } from 'src/app/services/article-category.service';

@Component({
  selector: "app-article-category",
  templateUrl: "./article-category.component.html",
  styleUrls: ["./article-category.component.scss"],
})
export class ArticleCategoryComponent extends BaseCrudComponent<ArticleCategoryModel> {
  constructor(service: ArticleCategoryService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Article Categories";
    this.recordTitle = "Article Category";
  }

  override openDetailModeHook(record: ArticleCategoryModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
  }
}
