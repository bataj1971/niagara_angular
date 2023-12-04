import { Component, Input } from '@angular/core';
import { AddressModel } from 'src/app/models/AddressModel';
import { SearchMap } from '../SearchMap';

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent {
  @Input() addressType: string = "Address";
  @Input() address: AddressModel;

  fieldErrorMessages: SearchMap = {};

  constructor() {
    this.address = new AddressModel();
  }
}
