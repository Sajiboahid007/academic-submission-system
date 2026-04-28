export interface Subcategory {
  Id: number;
  CategoriesId: number;
  Name: string;
  Status: boolean;
  CreatedDate: Date;
  UpdatedDate: Date;
  CreatedBy: string;
  UpdatedBy: string;
  IsMarkToDelete: boolean;
  ImageUrl: string;
}
