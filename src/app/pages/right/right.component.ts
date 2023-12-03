import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { RightModel } from 'src/app/models/RightModel';
import { RightService } from 'src/app/services/right.service';

@Component({
  selector: "app-right",
  templateUrl: "./right.component.html",
  styleUrls: ["./right.component.scss"],
})
export class RightComponent extends BaseCrudComponent<RightModel> {
  constructor(service: RightService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Groups";
    this.recordTitle = "Group";
  }

  override openDetailModeHook(record: RightModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
  }
}
