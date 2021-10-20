import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent implements OnInit {
  constructor(private apiService: APIService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe((response) => {
      console.log(response);
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isUserLoggedIn');
    this.router.navigate(['/login']);
  }
}
