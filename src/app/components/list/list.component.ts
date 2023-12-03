import { Component, ContentChild, EventEmitter, Inject, Input, Output, TemplateRef } from '@angular/core';
import { DisplayField } from '../DisplayField';
import { BaseService } from 'src/app/services/base.service';
import { SearchMap } from '../SearchMap';
import { CrudComponentModes, CrudStatus } from '../CrudComponentModes';

// import {CommonModule} from '@ngm';

import * as XLSX from 'xlsx';
import { MessageManagerService } from 'src/app/services/message-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<ModelType> {
  @Input() tableStructure: DisplayField<ModelType>[] = [];
  @Input() dataService!: BaseService<ModelType>;
  @Input() fulltextSearch: string = "";
  @Input() searchFilter: SearchMap = {};
  @Input() fixedSearchFilter: SearchMap = {};

  @Input() showNewRecordButton: boolean = true;
  @Input() showNewExcelButton: boolean = true;
  @Input() showwItemDetailsButton: boolean = true;
  @Input() showwActiveOnlyCheckbox: boolean = true;

  @Input() listView: ListViewOptionType = {
    fulltextSearch: "",
    limit: 20,
    page: 0,
    orderByField: '',
    reverseOrder: false,
    recordCount: 0,
    // fixedSearchFilter: {},
    // searchFilter: {}
  };

  @Output() onSetStatus: EventEmitter<CrudStatus> = new EventEmitter();


  linePart!: TemplateRef<ModelType>;
  errorMessage:string  = '';

  // @ContentChild(TemplateRef) templateRef!: TemplateRef<ModelType>  ;

  searchTimer?: ReturnType<typeof setTimeout>;
  searchTimeOutTime = 300;

  activeListedOnly:boolean = true;

  math = Math;
  searching = false;

  recordList: ModelType[] = [];
  recordCount: number = 0;

  constructor( private messageService: MessageManagerService) {
    // this.templateRef = new TemplateRef<ModelType>();
  }


  ngOnInit() {

    this.updateList();
  }

  setOrderbyField(fieldName: string) {
    if (this.listView.orderByField == fieldName) {
      this.listView.reverseOrder = !this.listView.reverseOrder;
    } else {
      this.listView.reverseOrder = false;
      this.listView.orderByField = fieldName;
    }
    this.listView.page = 0;
    this.updateList();
  }



  updateFulltextSeach() {

    this.recordList = [];

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(
      () => {
        console.log("updateFulltextSeach fired", this.listView.fulltextSearch);
        this.listView.page = 0;
        this.updateList();
      }
      , this.searchTimeOutTime
    );
  }
  async updateList() {
    console.log("updatelist fixedSearchFilter", this.fixedSearchFilter);

    this.searching = true;
    if (this.listView.fulltextSearch) {
      this.searchFilter['fullText'] = this.listView.fulltextSearch;
    } else {
      delete this.searchFilter['fullText'];
    }

    const orderByString = (this.listView.orderByField ? this.listView.orderByField + ":" + (this.listView.reverseOrder ? 'desc' : 'asc') : "");
    const offset = this.listView.page * this.listView.limit;
    const limit = this.listView.limit;


    const filter: SearchMap = Object.assign(this.searchFilter, this.fixedSearchFilter);

    try{

      this.errorMessage = '';

      if (this.dataService) {
        this.recordList = await this.dataService.getAll(filter, orderByString, offset, limit);

        this.recordCount = (this.dataService ? this.dataService.getRecordCount() : 0);
        this.searching = false;
      } else {
        console.log("updateList - no dataservice ");
        this.errorMessage = 'updateList - no dataservice ';
      }
    } catch(error : any){

      
      console.log("updateList catch:", error);
        this.errorMessage = error.message ?? '';

        for (const key in error.error.error.messages) {
           this.errorMessage += error.error.error.messages[key] + "\n";
        }

        this.messageService.addErrorMessage(this.errorMessage);
    }

  }




  getOrderBySign(fieldName: string) {
    if (this.listView.orderByField == fieldName) {
      return (this.listView.reverseOrder ? '⯅' : '⯆');
    }

    return ' ';
  }

  nextPage() {
    // if (this.listView.page < this.recordCount / this.listView.limit) {
    if (this.recordCount > (this.listView.page + 1) * this.listView.limit) {
      this.listView.page++;
      this.updateList();
    }
  }
  prevPage() {
    if (this.listView.page > 0) {
      this.listView.page--;
      this.updateList();
    }
  }

  openNewRecordMode() {
    this.onSetStatus.emit({ status: CrudComponentModes.EDIT });
  }
  openDetailMode(id: string | number) {
    this.onSetStatus.emit({ status: CrudComponentModes.DETAIL, recordId: id.toString() });
  }


  getIdValueFromRecord(record: ModelType): string {
    type ObjectKey = keyof ModelType;
    const idFieldName = 'id' as ObjectKey;
    const idValue = record[idFieldName] ?? '';
    return idValue as string;
  }

  async exportToExcel() {

    const title = 'export-excel';
    
    const fileName = 'ExportExce.xlsx';
    if (this.listView.fulltextSearch) {
      this.searchFilter['fullText'] = this.listView.fulltextSearch;
    } else {
      delete this.searchFilter['fullText'];
    }

    const orderByString = (this.listView.orderByField ? this.listView.orderByField + ":" + (this.listView.reverseOrder ? 'desc' : 'asc') : "");
    const offset = 0;
    const limit = 0;
    const filter: SearchMap = Object.assign(this.searchFilter, this.fixedSearchFilter);
    if (this.dataService) {

      const recordList = await this.dataService.getAll(filter, orderByString, offset, limit);

        const excelData = recordList.map(record => {
          const row: ExcelRow = {};
          for (const displayField of this.tableStructure) {
            const key = displayField.getLabelForTableHeader();
            const value = displayField.getRenderedValue(record);
            row[key] = value;
          }
          return row;
        });

        /* pass here the table id */
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, fileName);


    }

  }

  setActiveListedOnly(value:any){
    
    const newValue = value.currentTarget.checked;

    if (newValue)        {
      this.searchFilter['record_status'] = 'active';
    } else {
      delete this.searchFilter['record_status'];      
    }

    this.updateList();
  }
}

interface ExcelRow {
  [key: string]: string
}



export interface ListViewOptionType {
  fulltextSearch: string,
  limit: number,
  page: number,
  orderByField: string,
  reverseOrder: boolean,
  recordCount: number,
  // fixedSearchFilter: SearchMap,
  // searchFilter: SearchMap
};
