import { Component } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { AppDataModel } from "src/app/models/AppDataModel";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  appData: AppDataModel;

  constructor(private appService: AppService) {
    this.appData = this.appService.getEmptyRecord();
  }

  ngOnInit(): void {
    // this.appService.subscribeForAppData().subscribe((data) => {
    //   this.appData = data;
    // });
  }
}
