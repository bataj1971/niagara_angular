import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { CustomerCategoryModel } from 'src/app/models/CustomerCategoryModel';
import { CustomerCategoryService } from 'src/app/services/customer-category.service';

@Component({
  selector: "app-customer-category",
  templateUrl: "./customer-category.component.html",
  styleUrls: ["./customer-category.component.scss"],
})
export class CustomerCategoryComponent extends BaseCrudComponent<CustomerCategoryModel> {
  constructor(service: CustomerCategoryService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Customer Categories";
    this.recordTitle = "Customer Category";
  }

  override openDetailModeHook(record: CustomerCategoryModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
  }
}
