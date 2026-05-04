export interface Batches {
  Id: number;
  Name: string;
  Year: number;
  DepartmentId: number;
  CreatedAt: Date;
  UpdatedAt?: Date | null;
  CreatedBy?: string | null;
  UpdatedBy?: string | null;
  IsMarkToDelete: boolean;
}
