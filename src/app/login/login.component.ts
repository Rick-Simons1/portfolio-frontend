import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
          this.authService.auth();
          this.router.navigate(['/']);
        }
      });
  }
}
