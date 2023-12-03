

export class DisplayField<ModelType>{

    public fieldName: string = '';
    type: String = 'string';
    classList = [];
    public label = '';
    required:boolean;
    showInTable:boolean;
    showInEdit:boolean;
    showInDetail:boolean;
    valueRenderFunction: CustomValueRenderFunctionType<ModelType> ; 
    classRenderFunction: CustomClassRenderFunctionType<ModelType> ; 


    constructor(fieldName: string,displayFieldOptions: DisplayFieldOptions<ModelType>) {
        this.fieldName = fieldName;
        this.label = displayFieldOptions.label ?? fieldName;
        this.required = displayFieldOptions.required ?? true;
        this.showInTable = displayFieldOptions.showInTable ?? true;
        this.showInEdit = displayFieldOptions.showInEdit ?? true;
        this.showInDetail = displayFieldOptions.showInDetail ?? true;

        this.valueRenderFunction = displayFieldOptions.customValueRenderFunction ?? this.defaultValueRenderFunction;
        this.classRenderFunction = displayFieldOptions.customClassRenderFunction ??  this.getRenderedClasses;

        // console.log("list",fieldName,this);
        
    }

    /**
     * 
     * @param displayFieldOptions override this..
     */
    setCustomOoptions(displayFieldOptions: DisplayFieldOptions<ModelType>){

    }

    getFieldName():string {
        return this.fieldName
    }
    getLabelForInputControll():string {
        return this.label;
    }
    getLabelForDetailView():string {
        return this.label;
    }

    getLabelForTableHeader():string {
        return this.label;
    }
    getRenderedClasses():string {
        const classList = this.classList;
        return classList.join(' '); 
    }

    getRenderedValue(record: ModelType): string {

        return this.valueRenderFunction(record);        
    }
    
    defaultValueRenderFunction(record: ModelType): string {

        let renderedValue = '';
        type ObjectKey = keyof ModelType;
        
        const [key1,key2] = this.fieldName.split('.');
        
        const key = key1 as ObjectKey;        
        renderedValue = record[key] as string;

        if (key2) {
            type SubObjectKey = keyof typeof renderedValue;
            const subkey = key2 as SubObjectKey;        
            renderedValue = renderedValue[subkey] as string;            
            
        } 
        return renderedValue;
    }
}


export type CustomValueRenderFunctionType<ModelType> = {
    ( record:ModelType): string;
}
export type CustomClassRenderFunctionType<ModelType> = {
    (record:ModelType): string;
}

export interface DisplayFieldOptions<ModelType>  {
    required?:boolean,
    showInTable?:boolean,
    showInEdit?:boolean,
    showInDetail?:boolean,    
    dictionaryEntryId?:string
    editType?:string ,
    label?:string,
    type?:string,
    customValueRenderFunction?: CustomValueRenderFunctionType<ModelType>,
    customClassRenderFunction?: CustomClassRenderFunctionType<ModelType>,
};