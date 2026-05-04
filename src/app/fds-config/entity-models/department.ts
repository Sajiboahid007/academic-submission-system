export interface Department {
  Id: number;
  Name: string;
  Code: string;
  CreatedAt?: Date | null;
  UpdatedAt?: Date | null;
  IsMarkToDelete: boolean;
}
