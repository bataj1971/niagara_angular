import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AppDataModel } from "src/app/models/AppDataModel";

@Injectable({
  providedIn: "root",
})
export class AppService extends BaseService<AppDataModel> {
  assDataSubject = new BehaviorSubject<AppDataModel>(this.getEmptyRecord());
  appData: AppDataModel = this.getEmptyRecord();
  languageId = "default";
  loaded = false;

  override setPath(): void {
    this.path = "appdata/";
  }

  override async initService() {
    this.appData = await this.getById("appdata");
    if (!this.loaded) {
      this.assDataSubject.next(this.appData);
      const greetingName = this.appData.firstName ?? this.appData.userName;
      this.messageManagerService.addMessage("Welcome " + greetingName + "!");
      this.loaded = true;

      this.dictionaryService.setDictionary(this.appData.dictionary);
    }
    console.log("AppService::initService ready");
  }

  subscribeForAppData(): Observable<AppDataModel> {
    return this.assDataSubject.asObservable();
  }

  override getEmptyRecord(): AppDataModel {
    return {
      userName: "johndoe",
      firstName: "John",
      lastName: "Doe",
      isAdmin: false,
      id: "",
      languageId: "",
      dictionary: {},
    };
  }

  override getRecordId(record: AppDataModel) {
    return record.id;
  }
}
