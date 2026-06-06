export interface PaperApprovals {
  Id: number;
  PaperId?: number;
  ApprovedByUserId?: number;
  ApprovedDate?: string; // or Date if you convert it
  Status?: string;
  Remarks?: string;
  CreatedDate?: string;
  UpdatedDate?: string;
  CreatedBy?: string;
  UpdatedBy?: string;
  IsMarkToDelete?: boolean;
}
