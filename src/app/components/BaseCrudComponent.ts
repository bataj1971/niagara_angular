import { Component, OnInit, Input, ViewChild, ViewChildren, Output, EventEmitter, ElementRef } from '@angular/core';
import { BaseService } from '../services/base.service';
import { CrudComponentModes, CrudStatus } from './CrudComponentModes';

import { ActivatedRoute } from '@angular/router';
import { SearchMap } from './SearchMap';
import { DisplayDataStructure } from './DisplayDataStructure';
import { DisplayField, DisplayFieldOptions } from './DisplayField';
import { ListComponent, ListViewOptionType } from './list/list.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-base-crud', template: 'just a placeholder'
})
export abstract class BaseCrudComponent<ModelType> implements OnInit {
    @ViewChild('list') list!: ListComponent<ModelType>;
    
    
    @Output() refreshParent: EventEmitter<any> = new EventEmitter();

    @Input() fixedSearchFilter: SearchMap = {};
    @Input() searchFilter: SearchMap = {};
    @Input() parentName: string = '';
    @Input() subTitle: string = '';

    @Input() showHeaders: boolean = true;




    listView: ListViewOptionType;
    afterSaveSwithcToListMode = false;
    crudComponentModes = CrudComponentModes;

    fulltextSearch: string = "";
    math = Math;
    sourceIdFieldName: string = 'id';

    errorMessage = '';
    fieldErrorMessages: SearchMap = {};

    public dataService: BaseService<ModelType>;
    public recordList: ModelType[] = [];
    public mode: CrudComponentModes = CrudComponentModes.LIST;
    public title: string = 'base-crud-component';
    public newRecordTitle: string = 'new';
    public recordTitle = 'item';
    protected settings = {
        itemName: 'item',
        itemNamePl: 'items',
        showNerecordButton: true
    };
    public currentRecordId: string = '';
    public currentRecord: ModelType;
    public route: ActivatedRoute;



    displayDataStructure: DisplayDataStructure<ModelType>;
    tableStructure: DisplayField<ModelType>[] = [];

    searchTimer?: ReturnType<typeof setTimeout>;
    searchTimeOutTime = 300;

    constructor(dataService: BaseService<ModelType>, route: ActivatedRoute) {
                        
        this.dataService = dataService;
        this.route = route;
        this.currentRecord = this.dataService.getEmptyRecord();
        this.displayDataStructure = this.getDefaultDisplayDataStructure();
        this.setAdditionalDisplayDataStructure();

        this.tableStructure = this.displayDataStructure.getTableFieldList();
        this.listView = {
            fulltextSearch: "",
            limit: 20,
            page: 0,
            orderByField: '',
            reverseOrder: false,
            recordCount: 0,
        };
        console.log("basecrudcomponent listview before sending to listComponent:", this.listView);



    }

    ngOnInit() {
        console.log('listview ngoinit : fixedSearchFilter', this.recordTitle, this.fixedSearchFilter, this.fixedSearchFilter);

        this.openListMode();
    }

    openListMode() {
        this.mode = CrudComponentModes.LOAD;
        this.mode = CrudComponentModes.LIST;
    }

    openCreateMode() {
        this.mode = CrudComponentModes.LOAD;
        this.fieldErrorMessages = {};
        this.errorMessage = '';

        this.currentRecordId = '';
        this.currentRecord = this.dataService.getEmptyRecord();


        console.log('create with this.currentRecord', this.currentRecord, this.fixedSearchFilter);

        type ObjectKey = keyof ModelType;
        for (const fieldName in this.fixedSearchFilter) {

            const idFieldName = fieldName as ObjectKey;
            const z = this.currentRecord[idFieldName];
            this.currentRecord[idFieldName] = this.fixedSearchFilter[fieldName] as typeof z;
            console.log("openCreateMode - set field default value from fixedSearchFilter", idFieldName, this.fixedSearchFilter[fieldName]);

        }




        this.setRecordDefaultValuesHook();
        this.mode = CrudComponentModes.CREATE;

    }

    setRecordDefaultValuesHook() {
    }

    async openEditMode(id: string | number) {

        this.mode = CrudComponentModes.LOAD;
        this.fieldErrorMessages = {};
        this.errorMessage = '';

        this.currentRecord = this.dataService.getEmptyRecord();
        this.currentRecordId = id.toString();

        this.currentRecord = await this.dataService.getById(id.toString());
        this.currentRecordId = this.dataService.getRecordId(this.currentRecord);
        this.openEditModeHook(this.currentRecord)
        this.mode = CrudComponentModes.EDIT;

    }

    openEditModeHook(record: ModelType) { }


    async openDetailMode(id: string | number) {
        console.log("openDetailMode with id:", id);

        this.mode = CrudComponentModes.LOAD;
        this.currentRecord = await this.dataService.getById(id.toString());
        console.log("openDetailMode this.currentRecord after await:", this.currentRecord);
        this.openDetailModeHook(this.currentRecord);
        this.mode = CrudComponentModes.DETAIL;
        this.refresh();
    }

    openDetailModeHook(record: ModelType) { }

    async openDeleteMode(id: number) {
        this.mode = CrudComponentModes.LOAD;
        this.currentRecord = await this.dataService.getById(id.toString());
        this.mode = CrudComponentModes.DELETE;
    }

    handleEditFormSubmit(save: boolean) {
        if (save) {
            this.saveRecord(this.currentRecord);

        } else if (confirm("Cancel form")) {

            this.currentRecord = this.dataService.getEmptyRecord();
            this.openListMode();
        }

    }

    async saveRecord(record: ModelType) {
        // this.mode = CrudComponentModes.LOAD;
        try {

            // const idValue = this.getIdValueFromRecord(record);
            // TODO:
            // apply this.fixedSearchFilter values on record !
            // if this.fixedSearchFilter is added, input should be readonly 
            // record = Object.assign(record,this.fixedSearchFilter);
            
            this.fieldErrorMessages = {};
            this.errorMessage = '';


            if (this.validate(record)) {

                if (this.currentRecordId) {
                    this.currentRecord = await this.dataService.update(this.currentRecordId.toString(), record);
                } else {
                    this.currentRecord = await this.dataService.create(record);
                    this.currentRecordId = this.getIdValueFromRecord(this.currentRecord);
                }

                this.refreshParent.emit();
                
                console.log("savrecord after :", this.currentRecord);
                if (this.afterSaveSwithcToListMode) {
                    this.openListMode();
                } else {
                    this.openDetailMode(this.currentRecordId);
                }
            }

        } catch (error: any) {
            // error handling            
            console.log("saveRecord catch:", error);

            this.fieldErrorMessages = {};
            this.errorMessage = error.message ?? '';

            for (const key in error.error.error.messages) {
                if (key && !Number.isInteger(parseInt(key))) {
                    this.fieldErrorMessages[key] = error.error.error.messages[key];

                } else {
                    this.errorMessage += error.error.error.messages[key] + "\n";
                }
            }

        }

    }

    getIdValueFromRecord(record: ModelType): string {
        type ObjectKey = keyof ModelType;
        const idFieldName = this.sourceIdFieldName as ObjectKey;
        const idValue = record[idFieldName] ?? '';
        return idValue as string;

    }

    validate(record: ModelType): boolean {
        return true;
    }

    setRecordId(record: ModelType) {

        this.currentRecordId = this.dataService.getRecordId(record);
    }



    setMode(newStatus: CrudStatus) {

        console.log("setmode-"+this.title, newStatus);

        this.mode = newStatus.status;
        switch (this.mode) {
            case CrudComponentModes.DETAIL:
                this.openDetailMode(newStatus.recordId ?? '');
                break;
            case CrudComponentModes.EDIT:
                if (newStatus.recordId) {
                    this.openEditMode(newStatus.recordId);
                } else {
                    this.openCreateMode();
                }
                break;
            case CrudComponentModes.CREATE:
                this.openCreateMode();
                break;
            case CrudComponentModes.LIST:
                this.openListMode();
                break;

        }
    }


    deleteRecord() {
        if (confirm("Are you sure?"))
            this.currentRecord;
    }

    getDefaultDisplayDataStructure(): DisplayDataStructure<ModelType> {
        const displayFields = new DisplayDataStructure<ModelType>();
        return displayFields;
    }

    setAdditionalDisplayDataStructure() {

    }

    refresh(){
        console.log("refresh:"+this.title);
    }

    setToInactive(){
        console.log('setToInactive')
    }
    setToActive(){
        console.log('setToActive')
    }


}

