export class AcademicSubmissionConfig {
  public static readonly BaseUrl = 'http://localhost:3000' as const;
  public static readonly JwtTokenKey = 'TOKEN_KEY' as const;
  public static readonly RefreshTokenKey = 'REFRESH_TOKEN' as const;

  // login and refresh token url
  public static readonly RefreshTokenUrl = '/api/getToken/' as const;
  public static readonly LoginUrl = '/api/login' as const;
  public static readonly RegisterUrl = '/api/register' as const;

  public static readonly AnonymousUrls: string[] = [
    this.RefreshTokenUrl,
    this.LoginUrl,
    this.RegisterUrl,
  ] as const;

  public static readonly UserRole = {
    SuperAdmin: 'Super-Admin',
    Student: 'Student',
    Teacher: 'Teacher',
    Admin: 'Admin',
    Reviewer: 'Reviewer'
  } as const;

  public static readonly ApprovalStatus = {
    Draft: 'Draft',
    Pending: 'Pending',
    ReviewRequested: 'Review Requested',
    EditorialApproved: 'Editorial Approved',
    Approved: 'Approved',
    Rejected: 'Rejected',
  } as const;

  private static readonly RolesExceptStudent = Object.values(
    AcademicSubmissionConfig.UserRole,
  ).filter((role) => role !== AcademicSubmissionConfig.UserRole.Student) as string[];

  private static readonly AllRoleAsArray = Object.values(AcademicSubmissionConfig.UserRole).filter(
    (role) => role !== AcademicSubmissionConfig.UserRole.Student,
  ) as string[];

  public static readonly RoleWiseApprovalStatus = {
    Draft: {
      label: 'Draft',
      status: AcademicSubmissionConfig.ApprovalStatus.Draft,
      roles: this.AllRoleAsArray,
    },
    Pending: {
      label: 'Pending',
      status: AcademicSubmissionConfig.ApprovalStatus.Pending,
      roles: this.AllRoleAsArray,
    },
    Approved: {
      label: 'Approved',
      status: AcademicSubmissionConfig.ApprovalStatus.Approved,
      roles: this.RolesExceptStudent,
    },
    Rejected: {
      label: 'Rejected',
      status: AcademicSubmissionConfig.ApprovalStatus.Rejected,
      roles: this.RolesExceptStudent,
    },
  } as const;
}
