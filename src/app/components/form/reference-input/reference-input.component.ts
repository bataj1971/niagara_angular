import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { SearchMap } from '../../SearchMap';


@Component({
  selector: 'app-reference-input',
  templateUrl: './reference-input.component.html',
  styleUrls: ['./reference-input.component.scss']
})


export class ReferenceInputComponent<ModelType> implements OnInit {
  @Input() service!: BaseService<ModelType>;
  @Input() searchFilter: SearchMap = {};
  @Input() fieldDefinitions: SearchMap = {};
  @Input() sourceIdFieldName: string = 'id';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() initalSearchText: string = '';

  @Input() fieldListToShow = ["name"];
  @Input() targetIdField: string = '';
  @Output() targetIdFieldChange: EventEmitter<string> = new EventEmitter();

  

  recordList: ModelType[] = [];
  searchTimer?: ReturnType<typeof setTimeout>;
  searchTimeOutTime = 200;
  fulltextSearch: string = "";

  open: boolean = false;

  selectedItem = 0;

  id: string = '';
  label: string = '';

  constructor() {
    console.log('this.fulltextSearch ', '[' + this.fulltextSearch + ']');

  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges changes", changes);
    if (changes['targetIdField'].currentValue !== changes['targetIdField'].previousValue) {
      this.setfulltextSearchFromBackEnd(this.targetIdField);
    }
  }


  ngOnInit(): void {
    if (this.targetIdField && this.initalSearchText == '') {
      this.setfulltextSearchFromBackEnd(this.targetIdField)

    } else {
      this.fulltextSearch = this.initalSearchText;
    }

    // console.log("fieldListToShow",this.fieldListToShow);

  }

  async setfulltextSearchFromBackEnd(recordId: string) {
    this.fulltextSearch = '';
    
    if (!recordId) return;

    const record = await this.service.getById(recordId);

    if (record) {
      this.fulltextSearch = this.fieldListToShow.map(fieldName => { return this.getRenderedFieldValue(fieldName, record); }).join(' ');
    }

    // this.service.getById(recordId).subscribe((record) => {
    //   if (record) {
    //     this.fulltextSearch = this.fieldListToShow.map(fieldName => { return this.getRenderedFieldValue(fieldName, record); }).join(' ');
    //   }

    // });
  }

  // @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    switch (event.code) {
      case 'ArrowDown':
        if (this.selectedItem < this.recordList.length - 1) {
          this.selectedItem++
        }

        break;
      case 'ArrowUp':
        if (this.selectedItem > 0) {
          this.selectedItem--;
        } else {
          this.open = false;
        }
        break;
      case 'Enter':
        event.preventDefault();
        this.select(this.recordList[this.selectedItem]);
        // TODO: blur input, skip to next
        break;

    }
  }

  getRenderedFieldValue(fieldName: string, record: ModelType): string {
    let renderedValue = '';
    type ObjectKey = keyof ModelType;

    const [key1, key2] = fieldName.split('.');

    const key = key1 as ObjectKey;
    renderedValue = record[key] as string;

    if (key2) {
      type SubObjectKey = keyof typeof renderedValue;
      const subkey = key2 as SubObjectKey;
      renderedValue = renderedValue[subkey] as string;

    }
    return renderedValue;
  }

  getItemLabel(fieldName: string, record: ModelType): string {

    let itemLabel = '';

    return itemLabel;
  }



  updateFulltextSeach() {
    console.log("ReferenceInputComponent updated", this.fulltextSearch);
    this.recordList = [];
    this.open = true;
    this.selectedItem = 0;

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(
      () => {
        console.log("ReferenceInputComponent fired", this.fulltextSearch);
        this.updateList();
      }
      , this.searchTimeOutTime
    );
  }

  select(record: ModelType) {

    const id = this.getIdValueFromRecord(record);
    console.log("selected:", id, record);

    this.open = false;
    if (record) {
      console.log("selected 1 ");
      this.fulltextSearch = this.fieldListToShow.map(fieldName => { return this.getRenderedFieldValue(fieldName, record); }).join(' ');
    } else {
      console.log("selected 2 ");
      this.fulltextSearch = '';
    }


    this.targetIdFieldChange.emit(id);

  }

  getIdValueFromRecord(record: ModelType): string {
    if (!record) return "";
    type ObjectKey = keyof ModelType;
    const idFieldName = this.sourceIdFieldName as ObjectKey;
    const idValue = record[idFieldName] ?? '';
    return idValue as string;
  }

  async updateList() {
    if (this.fulltextSearch) {
      this.searchFilter['fullText'] = this.fulltextSearch;
    } else {
      delete this.searchFilter['fullText'];
    }

    if (this.service) {
      this.recordList = await  this.service.getAll(this.searchFilter);
      // this.service.getAll(this.searchFilter).subscribe((data) => {
      //   this.recordList = data;
      // });
    } else {
      console.log("ReferenceInputComponent updateList - no datasevice found",);

    }
  }

}

export interface ReferenceInputFieldDefinitions {
  [key: string]: {
    fieldName: string
  }
}

