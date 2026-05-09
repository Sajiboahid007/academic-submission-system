/** Row shape from API `data.Result[]` (PascalCase matches typical backend payloads). */
export interface NotificationApiDto {
  Id?: string | number;
  Title?: string;
  Message?: string;
  Body?: string;
  Status?: string;
  At?: string;
  CreatedAt?: string;
  DateTime?: string;
}

export interface NotificationListPayload {
  Result: NotificationApiDto[];
}

export type NotificationStatus = 'approved' | 'accepted' | 'rejected' | 'on_hold';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  at: Date;
}
