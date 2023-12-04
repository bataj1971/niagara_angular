import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { ArticleModel } from 'src/app/models/ArticleModel';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"],
})
export class ArticleComponent extends BaseCrudComponent<ArticleModel> {
  constructor(service: ArticleService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Articles";
    this.recordTitle = "Article";
  }

  override openDetailModeHook(record: ArticleModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
    
      // ean: string = "";
      // article_category_id: string = "";
      // price: number = 0;
      // unit: string = "piece";
      // suplier_customer_id: string = "";
      // manufacturer_customer_id: string = "";
  }
}
