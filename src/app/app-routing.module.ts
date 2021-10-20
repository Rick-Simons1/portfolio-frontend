import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'qrcode',
    component: QrCodeComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: '',
    component: PortfolioPageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
