import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { APIService } from '../services/api.service';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';
import { ToastrService } from 'ngx-toastr';


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
    private toastrService: ToastrService
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
    if(this.captchaSucces){
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
      }, error => {
        if(error.error.message === `username ${this.signUpForm.get('username')?.value} already exists`){
          this.toastrService.error(`username ${this.signUpForm.get('username')?.value} already exists`);
        }
        else if (error.error.message === `email ${this.signUpForm.get('email')} already exists`){
          this.toastrService.error(`email ${this.signUpForm.get('email')} already exists`);
        }
      });
    } else {
      this.toastrService.error('please complete CAPTCHA before registering account')
    }
    
  }

  public resolved(captchaResponse: string) {
    if(captchaResponse !== null){
      this.apiService.verifyReCaptcha(captchaResponse).subscribe((response) => {
        this.captchaSucces = response.success;
      });
    }else{
      this.captchaSucces = false;
    }
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
