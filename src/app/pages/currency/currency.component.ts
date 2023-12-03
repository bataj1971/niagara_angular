import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { CurrencyModel } from 'src/app/models/CurrencyModel';

import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: "app-currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.scss"],
})
export class CurrencyComponent extends BaseCrudComponent<CurrencyModel> {
  constructor(service: CurrencyService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Currencies";
    this.recordTitle = "Currency";
  }

  override openDetailModeHook(record: CurrencyModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("id", { label: "Currency" }));
    this.displayDataStructure.addField(new DisplayField("name", { label: "Name" }));
    this.displayDataStructure.addField(new DisplayField("minor_unit", { label: "minor unit" }));
  }
}
