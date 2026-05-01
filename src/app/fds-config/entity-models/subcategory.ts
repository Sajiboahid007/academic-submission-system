export interface SubCategory {
  Id: number;
  Name: string;
  Code?: string | null;
  Status: boolean;
  IsMarkToDelete: boolean;
  CategoryId: number;
  CreatedAt?: Date | null;
  UpdatedAt?: Date | null;
  CreatedBy: string;
  UpdatedBy?: string | null;
}
