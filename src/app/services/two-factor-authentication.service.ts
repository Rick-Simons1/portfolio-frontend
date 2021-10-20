import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorAuthenticationService {
  QrImageUrl: string | undefined;
  username: string | undefined;

  constructor() {}

  setQrImageUrl(imageUrl: string) {
    this.QrImageUrl = imageUrl;
  }

  setUsername(username: string) {
    this.username = username;
  }
}
