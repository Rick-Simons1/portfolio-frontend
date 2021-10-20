import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, PortfolioPageComponent, SignUpComponent, QrCodeComponent, VerifyComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
