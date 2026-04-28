export interface Category {
  Id: number;
  Name: string;
  Code?: string | null;
  IsMarkToDelete: boolean;
  CreatedAt: Date;
  UpdatedAt?: Date | null;
  CreatedBy?: string | null;
  UpdatedBy?: string | null;
}

export interface updateCategory {
  Id: number;
  Name: string;
  Code?: string | null;
}
