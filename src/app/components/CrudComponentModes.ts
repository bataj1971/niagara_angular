export enum CrudComponentModes{
    LOAD=0,
    LIST=1,
    EDIT=2,
    DETAIL=3,
    DELETE=4,
    CREATE = 5
}

export interface CrudStatus {
    status: CrudComponentModes;
    recordId? :string
}


export enum StockEventChangeMode {
    ALL='all',
    ASSIGNED_USER='user',
    LOCATION='location',
    OWNER='owner',
    STATUS='status',
    CONDITION='condition',
  }
