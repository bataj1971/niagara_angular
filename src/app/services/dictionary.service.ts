import { Injectable } from "@angular/core";
import { Dictionary, DictionaryEntryLocalized, DictionaryLocalized } from "src/app/models/AppDataModel";

@Injectable({
  providedIn: "root",
})
export class DictionaryService {
  languageId = "default";
  dictionaryLocalized: DictionaryLocalized = {};

  constructor() {}

  setDictionary(dictionary: Dictionary) {
    console.log("DictionaryService :: setDictionary", dictionary);

    for (const dictionaryEntryKey in dictionary) {
      const dictionaryEntry = dictionary[dictionaryEntryKey];

      this.dictionaryLocalized[dictionaryEntryKey] = {};
      for (const key in dictionaryEntry) {
        const value = dictionaryEntry[key][this.languageId] ?? dictionaryEntry[key]["default"];
        this.dictionaryLocalized[dictionaryEntryKey][key] = value;
      }
    }

    console.log("DictionaryService.dictionaryLocalized", this.dictionaryLocalized);
  }

  getDitionaryEntry(dictionaryEntryKey: string): DictionaryEntryLocalized {
    let dictionaryEntryLocalized: DictionaryEntryLocalized;

    if (dictionaryEntryKey in this.dictionaryLocalized) {
      dictionaryEntryLocalized = this.dictionaryLocalized[dictionaryEntryKey] ?? {};
    } else {
      dictionaryEntryLocalized = {};
      console.error("getDitionaryEntry dictionaryEntryKey not found ", dictionaryEntryKey);
    }
    return dictionaryEntryLocalized;
  }

  getDitionaryEntryValue(dictionaryEntryKey: string, valueKey: string): string {
    const dictionaryValue = this.dictionaryLocalized[dictionaryEntryKey][valueKey] ?? "*" + valueKey + "*";
    console.log("getDitionaryEntryValue", dictionaryEntryKey, valueKey, dictionaryValue);
    return dictionaryValue;
  }
}
