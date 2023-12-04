import { Component, Input } from '@angular/core';
import { AddressModel } from 'src/app/models/AddressModel';

@Component({
  selector: "app-address-details",
  templateUrl: "./address-details.component.html",
  styleUrls: ["./address-details.component.scss"],
})
export class AddressDetailsComponent {
  @Input() addressType: string = "Address";
  @Input() address: AddressModel = new AddressModel();
  
}
