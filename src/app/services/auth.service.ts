import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
  private redirectUrl!: string;

  constructor(private router: Router) {}

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public auth(): void {
    if (localStorage.getItem('accessToken') !== null) {
      this.authenticated = true;
      this.redirectUrl = this.redirectUrl === undefined ? '/' : this.redirectUrl;
      this.router.navigate([this.redirectUrl]);
    }
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}
