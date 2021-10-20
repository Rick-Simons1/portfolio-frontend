import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  constructor(
    private twoFactorService: TwoFactorAuthenticationService,
    private router: Router,
    private apiService: APIService,
    private authService: AuthService,
  ) {}

  public verifyForm: FormGroup = new FormGroup({
    code: new FormControl(''),
  });

  ngOnInit(): void {}

  public onSubmit(): void {
    this.apiService
      .verify({
        code: this.verifyForm.get('code')?.value,
        username: this.twoFactorService.username,
      })
      .subscribe((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.authService.auth();
        this.router.navigate(['/']);
      });
  }
}
