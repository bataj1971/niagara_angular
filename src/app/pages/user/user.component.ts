import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseCrudComponent } from "src/app/components/BaseCrudComponent";
import { DisplayField } from "src/app/components/DisplayField";
import { UserModel } from "src/app/models/UserModel";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent extends BaseCrudComponent<UserModel> {
  constructor(service: UserService, route: ActivatedRoute) {
    super(service, route);
    this.title = "Users";
    this.recordTitle = "User";
  }

  override openDetailModeHook(record: UserModel) {}

  override setAdditionalDisplayDataStructure(): void {
    this.displayDataStructure.addField(new DisplayField("name", { label: "name" }));
    this.displayDataStructure.addField(new DisplayField("loginname", { label: "Name" }));
    this.displayDataStructure.addField(new DisplayField("email", { label: "e-mail" }));
  }
}
