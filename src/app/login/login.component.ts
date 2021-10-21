import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  captchaSucces: boolean = false;

  ngOnInit() {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private apiService: APIService,
    private twoFactorService: TwoFactorAuthenticationService,
    private router: Router,
  ) {}

  public onSubmit(): void {
    if (this.captchaSucces) {
      this.apiService
        .signin({
          username: this.loginForm.get('username')?.value,
          password: this.loginForm.get('password')?.value,
        })
        .subscribe((response) => {
          if (response.mfa) {
            this.twoFactorService.setUsername(this.loginForm.get('username')?.value);
            this.router.navigate(['/verify']);
          } else {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('isUserLoggedIn', 'true');
            this.authService.auth();
            this.router.navigate(['/']);
          }
        });
    } else {
      console.log('must complete captcha');
    }
  }

  public resolved(captchaResponse: string) {
    this.apiService.verifyReCaptcha(captchaResponse).subscribe((response) => {
      this.captchaSucces = response.success;
    });
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
