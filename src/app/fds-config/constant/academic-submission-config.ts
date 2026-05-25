export class AcademicSubmissionConfig {
  public static readonly BaseUrl = 'http://localhost:3000' as const;
  public static readonly JwtTokenKey = 'TOKEN_KEY' as const;
  public static readonly RefreshTokenKey = 'REFRESH_TOKEN' as const;

  // login and refresh token url
  public static readonly RefreshTokenUrl = '/api/getToken/' as const;
  public static readonly LoginUrl = '/api/login' as const;

  public static readonly AnonymousUrls: string[] = [this.RefreshTokenUrl, this.LoginUrl] as const;

  public static readonly UserRole = {
    SuperAdmin: 'Super-Admin',
    Student: 'Student',
    Teacher: 'Teacher',
    Admin: 'Admin',
  } as const;
}
