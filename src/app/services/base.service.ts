import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageManagerService } from './message-manager.service';
import { Observable, lastValueFrom, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { SearchMap } from '../components/SearchMap';
import { DisplayDataStructure } from '../components/DisplayDataStructure';
import { AppService } from './app.service';
import { DictionaryService } from './dictionary.service';
import { BaseDataModel } from '../models/BaseDataModel';




@Injectable({
  providedIn: "root",
})
export abstract class BaseService<ModelType> {
  apiUrl: string = "";
  path: string = "";
  recordCount = 0;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json ; charset=utf-8",
    }),
  };

  constructor(protected httpClient: HttpClient, public messageManagerService: MessageManagerService, public dictionaryService: DictionaryService) {
    this.apiUrl = environment.apiURL;
    this.setPath();
    this.initService();
  }

  initService() {}

  abstract setPath(): void;

  async create(data: ModelType): Promise<ModelType> { // Observable<ModelType>
    return await lastValueFrom(this.httpClient.post<ModelType>(this.apiUrl + this.path, JSON.stringify(data), this.httpOptions));
  }

  async getById(id: string): Promise<ModelType> { //  Observable<ModelType>
    return await lastValueFrom(this.httpClient.get<ModelType>(this.apiUrl + this.path + id));
  }

  async getAll(
    filterConditions: SearchMap = {},
    sortByFields: string = "",
    offset: number = 0,
    limit: number = 10
  ): Promise<ModelType[]> { // Observable<ModelType[]>
    const params: urlParams = {};

    for (const key in filterConditions) {
      params[key] = filterConditions[key];
    }

    if (sortByFields) {
      params["sort_by"] = sortByFields;
    }

    params["offset"] = offset.toString();
    params["limit"] = limit.toString();

    return await lastValueFrom(
      this.httpClient.get<ModelType[]>(this.apiUrl + this.path, { params: params, observe: "response" }).pipe(
        map((response) => {
          this.recordCount = (response.headers.get("recordCount") ?? 0) as number;
          console.log("baseservice, this.recordCount ", this.recordCount, response);
          return response.body as ModelType[];
        })
      )
    );
  }

  getRecordCount(): number {
    return this.recordCount;
  }

  async update(
    id: string,
    data: ModelType
  ): Promise<ModelType> { // Observable<ModelType>
    return await lastValueFrom(this.httpClient.put<ModelType>(this.apiUrl + this.path + id, JSON.stringify(data), this.httpOptions));
  }

  async delete(id: string) {
    return await this.httpClient.delete<ModelType>(this.apiUrl + this.path + id, this.httpOptions);
  }
  async errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = "";
    alert("baseservice errorhandler");

    console.log("errorHandler", errorResponse);

    const errorMessages = errorResponse.error.error.messages ?? {};
    errorMessage = "";

    this.messageManagerService.addErrorMessage(errorMessage);
    return throwError(() => errorMessages);
  }

  validate(data: ModelType): boolean {
    return true;
  }

  abstract getEmptyRecord(): ModelType;
  
  // override getEmptyRecord(): UserModel {
  //   return new UserModel();

  abstract getRecordId(record: ModelType): string;

  exportToExcel() {
    alert("exportToExcel");
  }
}

interface urlParams {
    [key:string]:string;
}
