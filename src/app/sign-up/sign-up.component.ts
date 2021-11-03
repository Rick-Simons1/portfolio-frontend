import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { APIService } from '../services/api.service';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  captchaSucces: boolean = false;

  constructor(
    private apiService: APIService,
    private twoFactorService: TwoFactorAuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public signUpForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    username: new FormControl(''),
    MFA: new FormControl(false),
  });

  public onSubmit(): void {
    if (this.captchaSucces) {
      this.apiService
        .signup({
          name: this.signUpForm.get('name')?.value,
          username: this.signUpForm.get('username')?.value,
          email: this.signUpForm.get('email')?.value,
          password: this.signUpForm.get('password')?.value,
          mfa: this.signUpForm.get('MFA')?.value,
        })
        .subscribe((response) => {
          console.log(response);
          if (response.mfa) {
            this.twoFactorService.setQrImageUrl(response.secretImageUri);
            this.router.navigate(['/qrcode']);
          } else {
            this.router.navigate(['/login']);
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
