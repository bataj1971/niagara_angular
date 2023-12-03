import { DisplayField } from "./DisplayField";

export class DisplayDataStructure<ModelType> {
    public displayTitle = '';

    public displayFieldList : DisplayFieldList<ModelType>;

    constructor(){
        this.displayFieldList = {};
    }

    getTableFieldList() :DisplayField<ModelType>[] {
        return Object.values(this.displayFieldList);
    }

    addField(displayField:DisplayField<ModelType>) {
            this.displayFieldList[displayField.fieldName] = displayField;
    }        
}


export interface DisplayFieldList<ModelType> {
    [key: string]: DisplayField<ModelType>;
}


