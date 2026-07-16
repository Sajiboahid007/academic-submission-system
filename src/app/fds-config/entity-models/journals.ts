import { PaperApprovals } from './approval';

export interface Journals {
    Id: number;
    Title: string;
    Abstract?: string;
    UserId?: number;
    CategoryId?: number;
    SubcategoryId?: number;
    Name?: string;
    Authors?: string;
    Affiliation?: string;
    Keywords?: string;
    AuthorDeclaration?: string;
    Volume?: string;
    IssueNumber?: string;
    DOI?: string;
    Year?: string;
    FileUrl: string;
    ResponseLater?: string;
    CreatedDate?: Date | null;
    UpdatedDate?: Date | null;
    CreatedBy?: string;
    UpdatedBy?: string;
    IsMarkToDelete?: boolean;
    PaperApprovals?: PaperApprovals[];
}
