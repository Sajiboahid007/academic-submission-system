export interface Category {
  Id: number;
  Name: string;
  Status?: boolean;
  CreatedBy?: string;
  CreatedDate?: Date;
  UpdatedBy?: string;
  UpdatedDate?: Date;
  IsMarkToDelete?: boolean;
  ImageUrl?: string;
}
