import { Component, Input } from "@angular/core";
import { AddressModel } from "src/app/models/AddressModel";
import { SearchMap } from "../SearchMap";
import { CountryService } from "src/app/services/country.service";

@Component({
  selector: "app-address-edit",
  templateUrl: "./address-edit.component.html",
  styleUrls: ["./address-edit.component.scss"],
})
export class AddressEditComponent {
  @Input() addressType: string = "Address";
  @Input() address: AddressModel = new AddressModel();

  fieldErrorMessages: SearchMap = {};
  
  constructor(protected countryService: CountryService) { }
}
