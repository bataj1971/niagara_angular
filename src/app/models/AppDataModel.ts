export interface AppDataModel {
    firstName:string,
    lastName:string,
    userName:string,
    isAdmin:boolean,
    id:string,
    languageId:string,
    dictionary:Dictionary
}

// structure for different 
export interface Dictionary{
    [index: string]: DictionaryEntry;
}

//  contains language 
export interface DictionaryEntry{
    [index: string]:{ [index:string]:string}
}


// dictionaryentry selected for current language or fallback values
export interface DictionaryEntryLocalized {
    [index: string]:string
}

export interface DictionaryLocalized {
    [index: string]: DictionaryEntryLocalized;
}