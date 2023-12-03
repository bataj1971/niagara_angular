import { NameDataModel } from "./NameDataModel";

export class ArticleModel extends NameDataModel {
  ean: string = "";
  article_category_id: string = "";
  price: number = 0;
  unit: string = "piece";
  suplier_customer_id: string = "";
  manufacturer_customer_id: string = "";
}
