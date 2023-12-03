import { DictionaryService } from "../services/dictionary.service";
import { DictionaryEntryLocalized } from "../services/models/AppDataModel";
import { DisplayField, DisplayFieldOptions } from "./DisplayField";


export class SelectDisplayField<ModelType> extends DisplayField<ModelType> {
    protected dictionaryId:string = '';
    protected dictionaryEntry:DictionaryEntryLocalized = {};

    constructor(fieldName: string,displayFieldOptions: DisplayFieldOptions<ModelType>, dictionaryEntry:DictionaryEntryLocalized) {
        super(fieldName,displayFieldOptions);
        this.dictionaryEntry = dictionaryEntry;        
        console.log(" SelectDisplayField dictionaryEntry",fieldName,dictionaryEntry);
        
    }

    override defaultValueRenderFunction(record: ModelType): string {
        
        const keyValue = super.defaultValueRenderFunction(record);
        const labelValue = this.dictionaryEntry[keyValue] ?? "*"+keyValue+"*";
        return labelValue;
    }   

}