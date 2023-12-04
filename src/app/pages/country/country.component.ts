import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { CountryModel } from 'src/app/models/CountryModel';
import { CountryService } from 'src/app/services/country.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: "app-country",
  templateUrl: "./country.component.html",
  styleUrls: ["./country.component.scss"],
})
export class CountryComponent extends BaseCrudComponent<CountryModel> {
  constructor(service: CountryService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Countries";
    this.recordTitle = "Country";
  }

  override openDetailModeHook(record: CountryModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("id", { label: "Currency" }));
    this.displayDataStructure.addField(new DisplayField("name", { label: "Name" }));
    this.displayDataStructure.addField(new DisplayField("minor_unit", { label: "minor unit" }));
  }
}
