import { PaperApprovals } from './approval';

export interface Papers {
    Id: number;
    Title?: string;
    Abstract?: string;
    UserId?: number;
    CategoryId?: number;
    SubcategoryId?: number;
    DepartmentId?: number;
    BatchId?: number;
    Year?: string;
    FileUrl?: string;
    IsMarkToDelete?: boolean;
    CreatedDate?: Date | null;
    UpdatedDate?: Date | null;
    CreatedBy?: string;
    UpdatedBy?: string;
    PaperApprovals?: PaperApprovals[];
}