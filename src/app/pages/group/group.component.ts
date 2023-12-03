import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCrudComponent } from 'src/app/components/BaseCrudComponent';
import { DisplayField } from 'src/app/components/DisplayField';
import { GroupModel } from 'src/app/models/GroupModel';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"],
})
export class GroupComponent extends BaseCrudComponent<GroupModel> {
  constructor(service: GroupService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Groups";
    this.recordTitle = "Group";
  }

  override openDetailModeHook(record: GroupModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
  }
}
