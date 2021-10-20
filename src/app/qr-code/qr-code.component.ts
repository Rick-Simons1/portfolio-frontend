import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  qrCodeImageUrl: string | undefined;

  constructor(private twoFactorSerice: TwoFactorAuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.qrCodeImageUrl = this.twoFactorSerice.QrImageUrl;
  }
}
