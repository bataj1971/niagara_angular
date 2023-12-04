import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { CustomerModel } from 'src/app/models/CustomerModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent extends BaseCrudComponent<CustomerModel> {
  constructor(service: CustomerService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Customers";
    this.recordTitle = "Customer";
  }

  override openDetailModeHook(record: CustomerModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
        this.displayDataStructure.addField(new DisplayField("email", { label: "e-mail" }));
  }
}
