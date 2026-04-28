import { Injectable } from '@angular/core';
import { DecodeService } from './decode-service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private readonly decodeService: DecodeService) {}

  getUserInfo(): any {
    return this.decodeService.getDecodedToken();
  }
}
