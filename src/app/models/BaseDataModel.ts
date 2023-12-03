export class BaseDataModel {
  id: string = "";
  created_by?: string = "";
  modified_by?: string = "";
  created_at?: string = "";
  modified_at?: string = "";
  modified_by_user?: { id: number; name: string; email: string };
  created_by_user?: { id: number; name: string; email: string };
}

