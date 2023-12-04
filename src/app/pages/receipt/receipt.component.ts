import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { SearchMap } from 'src/app/components/SearchMap';
import { ReceiptModel } from 'src/app/models/ReceiptModel';
import { CurrencyService } from 'src/app/services/currency.service';

import { CustomerService } from 'src/app/services/customer.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ReceiptService } from 'src/app/services/receipt.service';


@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"],
})
export class ReceiptComponent extends BaseCrudComponent<ReceiptModel> {
  
  receiptTypes: SearchMap = {};
  addressSectionVisible = true;
  
  
  constructor(service: ReceiptService, route: ActivatedRoute,
    protected customerService: CustomerService,
    protected currencyService: CurrencyService,
    protected dictionaryService: DictionaryService)
  {
    super(service, route);
    this.title = "Receipts";
    this.recordTitle = "Receipt";
    this.receiptTypes = this.dictionaryService.getDitionaryEntry("receiptTypes");
    console.log("ReceiptComponent : this.receiptTypes", this.receiptTypes);
  }

  override openDetailModeHook(record: ReceiptModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("receipttype", { label: "type" }));
    this.displayDataStructure.addField(new DisplayField("receiptnumber", { label: "Receipt-number" }));
    this.displayDataStructure.addField(new DisplayField("duedate", { label: "Due-date" }));
    this.displayDataStructure.addField(new DisplayField("value", { label: "Value" }));
    this.displayDataStructure.addField(new DisplayField("vat", { label: "Value" }));
  }

  async customerChanged() {
    const customer = await this.customerService.getById(this.currentRecord.customer_id);
    this.currentRecord.customer.name = customer.name;
    this.currentRecord.customer.address = customer.address;
    this.currentRecord.customer.shipping_address = customer.shipping_address;
  }
}
