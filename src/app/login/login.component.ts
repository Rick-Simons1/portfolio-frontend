import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
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
    private toastrService: ToastrService

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
        }, error => {
          console.log(error.error.message);
          if(error.error.message === 'Bad credentials'){
            this.toastrService.error('this username and password do not match')
          }
        })
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

  public onChange(value: any){
    console.log(value);
  }
}