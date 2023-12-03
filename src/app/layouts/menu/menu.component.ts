import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { AppDataModel } from "src/app/models/AppDataModel";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  projectLoaded = true;
  navbarMenuOpen = false;

  appData: AppDataModel;

  constructor(private appService: AppService) {
    this.appData = this.appService.getEmptyRecord();
  }

  ngOnInit(): void {
    this.appService.subscribeForAppData().subscribe((data) => {
      console.log("MenuComponent got appdata:", data);
      this.appData = data;
    });
  }

  toggleNavbarMenu() {
    this.navbarMenuOpen = !this.navbarMenuOpen;
  }
}
